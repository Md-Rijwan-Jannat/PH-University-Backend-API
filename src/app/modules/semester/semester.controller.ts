import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SemesterServices } from "./semester.service";
import { Semester } from "./semester.model";

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
  const result = await SemesterServices.getAllSemesterFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semesters retrieved successfully!",
    meta: result.meta,
    data: result.result,
  });
});

// Get single semester controller
const getSingleSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const semester = await Semester.findOneOrThrowError(semesterId);
  const result = await SemesterServices.getSingleSemesterFromDB(
    semester._id as string,
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
