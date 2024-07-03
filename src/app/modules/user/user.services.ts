/* eslint-disable @typescript-eslint/no-explicit-any */
import config from "../../config";
import httpStatus from "http-status";
import mongoose from "mongoose";
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from "./user.utils";
import { Semester } from "../semester/semester.model";
import { IStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import { AppError } from "../../middlewares/AppError";
import { IFaculty } from "../faculty/faculty.interface";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { Faculty } from "../faculty/faculty.model";
import { IAdmin } from "../admin/admin.interface";
import { Admin } from "../admin/admin.model";

const createStudentIntoDB = async (password: string, payload: IStudent) => {
  const userData: Partial<IUser> = {};
  userData.password = password || (config.default_password as string);

  userData.role = "student";
  userData.email = payload.email;

  const admissionSemester = await Semester.findById(payload.admissionSemester);
  if (!admissionSemester) {
    throw new AppError(httpStatus.BAD_REQUEST, "Admission semester not found");
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.id = await generateStudentId(admissionSemester);
    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create student");
    }

    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createFacultyIntoDB = async (password: string, payload: IFaculty) => {
  // Validate payload at the start
  if (!payload) {
    throw new AppError(httpStatus.BAD_REQUEST, "Payload is required");
  }

  const userData: Partial<IUser> = {};
  userData.password = password || (config.default_password as string);
  userData.role = "faculty";
  userData.email = payload.email;

  console.log("Received payload:", JSON.stringify(payload, null, 2));

  if (!payload.academicDepartment) {
    console.error("academicDepartment is missing from payload");
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Academic department is required",
    );
  }

  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );
  if (!academicDepartment) {
    console.error(
      `Academic department not found for ID: ${payload.academicDepartment}`,
    );
    throw new AppError(httpStatus.BAD_REQUEST, "Academic department not found");
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.id = await generateFacultyId();
    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }

    // Ensure payload is still valid after user creation
    if (!payload) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Payload became undefined after user creation",
      );
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newFaculty = await Faculty.create([payload], { session });
    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create faculty");
    }

    await session.commitTransaction();
    await session.endSession();
    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    console.error("Error during faculty creation:", err);
    throw new Error(err);
  }
};

const createAdminIntoDB = async (password: string, payload: IAdmin) => {
  const userData: Partial<IUser> = {};
  userData.password = password || (config.default_password as string);
  userData.role = "admin";
  userData.email = payload.email;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.id = await generateAdminId();
    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newAdmin = await Admin.create([payload], { session });
    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }

    await session.commitTransaction();
    await session.endSession();
    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
};
