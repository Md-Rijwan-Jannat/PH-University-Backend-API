import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.services";

// create student
const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  // Log the incoming request body for debugging
  console.log("createStudent request body:", req.body);

  if (!studentData) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: "Student data is required",
      data: null,
    });
  }

  const result = await UserServices.createStudentIntoDB(password, studentData);
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

  // Log the incoming request body for debugging
  console.log("createFaculty request body:", req.body);

  if (!facultyData) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: "Faculty data is required",
      data: null,
    });
  }

  const result = await UserServices.createFacultyIntoDB(password, facultyData);
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

  // Log the incoming request body for debugging
  console.log("createAdmin request body:", req.body);

  if (!adminData) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: "Admin data is required",
      data: null,
    });
  }

  const result = await UserServices.createAdminIntoDB(password, adminData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin created successfully!",
    data: result,
  });
});

export const UserController = {
  createStudent,
  createFaculty,
  createAdmin,
};
