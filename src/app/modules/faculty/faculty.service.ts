import mongoose from "mongoose";
import { IFaculty } from "./faculty.interface";
import { Faculty } from "./faculty.model";
import { User } from "../user/user.model";
import { AppError } from "../../middlewares/AppError";
import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import { searchingFields } from "./faculty.constants";

const getAllFacultyFromDB = async (query: Record<string, unknown>) => {
  const filterQueryBuilder = new QueryBuilder(
    Faculty.find()
      .populate("user")
      .populate("academicDepartment")
      .populate("academicFaculty"),
    query,
  )
    .search(searchingFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await filterQueryBuilder.modelQuery;
  const meta = await filterQueryBuilder.countTotal();

  return {
    meta,
    result,
  };
};

// Get single faculty service
const getSingleFacultyFromDB = async (id: string) => {
  const result = await Faculty.findOne({ id })
    .populate("user")
    .populate("academicDepartment")
    .populate("academicFaculty");
  return result;
};

// update single faculty service
const updateSingleFacultyFromDB = async (
  id: string,
  payload: Partial<IFaculty>,
) => {
  const { name, ...restFacultyData } = payload;
  const modifiedFacultyData: Record<string, unknown> = { ...restFacultyData };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedFacultyData[`name.${key}`] = value;
    }
  }

  const result = await Faculty.findOneAndUpdate(
    {
      id,
    },
    modifiedFacultyData,
    {
      new: true,
      runValidators: true,
    },
  )
    .populate("user")
    .populate("academicDepartment")
    .populate("academicFaculty");

  return result;
};

// delete faculty service
const deleteFacultyFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const facultyDelete = await Faculty.findOneAndUpdate(
      { id: id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!facultyDelete) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Faculty delete method failed",
      );
    }

    const userDelete = await User.findOneAndUpdate(
      { id: id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!userDelete) {
      throw new AppError(httpStatus.BAD_REQUEST, "User delete method failed");
    }

    await session.commitTransaction();
    await session.endSession();

    return facultyDelete;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, "This data already deleted");
  }
};

export const FacultyServices = {
  getAllFacultyFromDB,
  getSingleFacultyFromDB,
  updateSingleFacultyFromDB,
  deleteFacultyFromDB,
};
