import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import { AppError } from "../../middlewares/AppError";
import { ISemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistration } from "./semesterRegistration.model";
import { OfferedCourse } from "../offeredCourse/offeredCourse.model";
import mongoose from "mongoose";

const createSemesterRegistrationIntoDB = async (
  payload: ISemesterRegistration,
) => {
  await SemesterRegistration.isExistingSemesterRegistration(
    payload.academicSemester,
  );
  const result = await SemesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate("academicSemester"),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};

const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id);
  return result;
};

const updateSingleSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<ISemesterRegistration>,
) => {
  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteSingleSemesterRegistrationIntoDB = async (id: string) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    const semesterRegistration =
      await SemesterRegistration.findById(id).session(session);

    if (!semesterRegistration) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        "Semester registration not found!",
      );
    }

    const isOfferedCourseExistingWithSemesterRegistrationId =
      await OfferedCourse.find({
        semesterRegistration: id,
      }).session(session);

    if (!isOfferedCourseExistingWithSemesterRegistrationId.length) {
      throw new AppError(httpStatus.NOT_FOUND, "Offered course not found!");
    }

    if (semesterRegistration.status !== "UPCOMING") {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `You can't delete this semester registration because it is ${semesterRegistration.status}`,
      );
    }

    const offeredCourseIds =
      isOfferedCourseExistingWithSemesterRegistrationId.map((obj) => obj._id);

    const deletedOfferedCourse = await OfferedCourse.deleteMany(
      {
        _id: { $in: offeredCourseIds },
      },
      { session },
    );

    if (deletedOfferedCourse.deletedCount === 0) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        "No offered courses were deleted!",
      );
    }

    const result = await SemesterRegistration.findByIdAndDelete(id, {
      session,
    });

    if (!result) {
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Failed to delete semester registration!",
      );
    }

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to delete semester registration!",
    );
  }
};

export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSingleSemesterRegistrationIntoDB,
  deleteSingleSemesterRegistrationIntoDB,
};
