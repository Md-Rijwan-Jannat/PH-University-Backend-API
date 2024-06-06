import { StudentServices } from "./student.services";
import { catchAsync } from "../../utils/catchAsync";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";

// Get all students
const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Students are retrieved successfully!",
    data: result,
  });
});

// Get single student
const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  // const student = await Student.findOneOrThrowError(studentId as string);
  console.log(studentId);

  const result = await StudentServices.getSingleStudentFromDB(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is retrieved successfully!",
    data: result,
  });
});

// Update single student
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

// Delete student
const deleteStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.deleteStudentFromDB(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is deleted!",
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  updateSingleStudent,
  deleteStudent,
};
