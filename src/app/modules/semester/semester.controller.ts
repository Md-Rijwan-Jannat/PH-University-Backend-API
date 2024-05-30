import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SemesterServices } from "./semester.service";

// Semester create controller
const createSemester = catchAsync(async (req, res) => {
  const { semester: semesterData } = await req.body;
  const result = await SemesterServices.createSemesterIntoDB(semesterData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semester create successfully!",
    data: result,
  });
});

// Get all semester controller
const getAllSemester = catchAsync(async (req, res) => {
  const result = await SemesterServices.getAllSemesterFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semesters retrieved successfully!",
    data: result,
  });
});

// Get single semester controller
const getSingleSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result = await SemesterServices.getSingleSemesterFromDB(
    semesterId as string,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semester retrieved successfully!",
    data: result,
  });
});

// Update single semester controller
const updateSingleSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const { semester: updateData } = await req.body;
  const result = await SemesterServices.updateSemesterDetailsFromDB(
    semesterId,
    updateData,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semester updated successfully!",
    data: result,
  });
});

export const SemesterController = {
  createSemester,
  getAllSemester,
  getSingleSemester,
  updateSingleSemester,
};
