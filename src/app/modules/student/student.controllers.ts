import { StudentServices } from "./student.services";
import { catchAsync } from "../../utils/catchAsync";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { Student } from "./student.model";

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
  const { studentId } = req.params;
  const student = await Student.findOneOrThrowError(studentId as string);
  const result = await StudentServices.getSingleStudentFromDB(
    student.id as string,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is retrieved successfully!",
    data: result,
  });
});

// Get single update student controller
const updateSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const { student: studentData } = req.body;
  const result = await StudentServices.updateSingleStudentFromDB(
    studentId,
    studentData,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student updated successfully!",
    data: result,
  });
});

// Delete student controller
const deleteStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const student = await Student.findOneOrThrowError(studentId as string);
  const result = await StudentServices.deleteStudentFromDB(
    student.id as string,
  );
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
  updateSingleStudent,
  deleteStudent,
};
