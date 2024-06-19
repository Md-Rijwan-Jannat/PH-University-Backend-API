import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { SemesterRegistrationService } from "./semesterRegistration.service";
import { catchAsync } from "../../utils/catchAsync";

const createSemesterRegistration = catchAsync(async (req, res) => {
  const { semesterRegistration: semesterRegistrationData } = req.body;
  const result =
    await SemesterRegistrationService.createSemesterRegistrationIntoDB(
      semesterRegistrationData,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semester registration successfully!",
    data: result,
  });
});

const getAllSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationService.getAllSemesterRegistrationFromDB(
      req.query,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semester registrations are retrieved successfully!",
    data: result,
  });
});

const getSingleSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await SemesterRegistrationService.getSingleSemesterRegistrationFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semester registration is retrieved successfully!",
    data: result,
  });
});

const updateSingleSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { semesterRegistration: semesterRegistrationData } = req.body;
  const result =
    await SemesterRegistrationService.updateSingleSemesterRegistrationIntoDB(
      id,
      semesterRegistrationData,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semester registration successfully!",
    data: result,
  });
});

const deleteSingleSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await SemesterRegistrationService.deleteSingleSemesterRegistrationIntoDB(
      id,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message:
      "Semester registration and refer offered course are deleted successfully!",
    data: result,
  });
});

export const SemesterRegistrationController = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSingleSemesterRegistration,
  deleteSingleSemesterRegistration,
};
