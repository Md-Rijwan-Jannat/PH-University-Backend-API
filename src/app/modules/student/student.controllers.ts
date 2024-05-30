import { StudentServices } from "./student.services";
import { catchAsync } from "../../utils/catchAsync";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";

// Get all student
const grtAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student are retrieved successfully!",
    data: result,
  });
});

// Get single student
const getSingleStudent = catchAsync(async (req, res) => {
  const { _id } = req.query;
  const result = await StudentServices.getSingleStudentFromDB(_id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is retrieved successfully!",
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const { _id } = req.query;
  const result = await StudentServices.deleteStudentFromDB(_id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is deleted!",
    data: result,
  });
});

export const StudentControllers = {
  grtAllStudents,
  getSingleStudent,
  deleteStudent,
};
