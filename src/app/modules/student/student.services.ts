import mongoose from "mongoose";
import { IStudent } from "./student.interface";
import { Student } from "./student.model";
import { User } from "../user/user.model";
import { AppError } from "../../middlewares/appError";
import httpStatus from "http-status";

// Get All student service
const getAllStudentFromDB = async () => {
  const result = await Student.find().populate("admissionSemester").populate({
    path: "academicDepartment",
    populate: "academicFaculty",
  });
  return result;
};

// Get single student service
const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: "academicFaculty",
    });
  return result;
};

// update single student service
const updateSingleStudentFromDB = async (
  id: string,
  payload: Partial<IStudent>,
) => {
  const { name, guardian, localGuardian, ...restStudentData } = payload;
  const modifiedStudentData: Record<string, unknown> = { ...restStudentData };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedStudentData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedStudentData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedStudentData[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate(
    {
      id,
    },
    modifiedStudentData,
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

// delete student service
const deleteStudentFromDB = async (id: string) => {
  console.log(id);
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const studentDelete = await Student.findOneAndUpdate(
      { id: id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!studentDelete) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Student delete method failed",
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

    return studentDelete;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, "This data already deleted");
  }
};

export const StudentServices = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  updateSingleStudentFromDB,
  deleteStudentFromDB,
};
