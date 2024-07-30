/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.services";

// create student
const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  const result = await UserServices.createStudentIntoDB(
    req.file as any,
    password,
    studentData,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User student created successfully!",
    data: result,
  });
});

// create faculty
const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const result = await UserServices.createFacultyIntoDB(
    req.file as any,
    password,
    facultyData,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty created successfully!",
    data: result,
  });
});

// create admin
const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await UserServices.createAdminIntoDB(
    req.file as any,
    password,
    adminData,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin created successfully!",
    data: result,
  });
});

// gwt me
const getMe = catchAsync(async (req, res) => {
  const { userId, role } = req.user;

  const result = await UserServices.getMe(userId, role as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is retrieved successfully!",
    data: result,
  });
});

// user status change
const userStatusChange = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.userStatusChangeIntoDB(req.body, id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User status change successfully!",
    data: result,
  });
});

export const UserController = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
  userStatusChange,
};
