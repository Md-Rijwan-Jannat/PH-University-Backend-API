import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { OfferedCourseService } from "./offeredCourse.service";

const createOfferedCourse = catchAsync(async (req, res) => {
  const { offeredCourse: offeredCourseData } = req.body;

  const result =
    await OfferedCourseService.createOfferedCourseIntoDB(offeredCourseData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Create offered course successfully!",
    data: result,
  });
});

const getAllOfferedCourse = catchAsync(async (req, res) => {
  const result = await OfferedCourseService.getAllOfferedCourseFromDB(
    req.query,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Offered courses are retrieved successfully!",
    meta: result.meta,
    data: result.result,
  });
});

const getMyOfferedCourse = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const result = await OfferedCourseService.getMyOfferedCourseFromDB(
    userId,
    req.query,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "My Offered courses are retrieved successfully!",
    meta: result.meta,
    data: result.result,
  });
});

const getSingleOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OfferedCourseService.getSingleOfferedCourseFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Offered course is retrieved successfully!",
    data: result,
  });
});

const updateSingleOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { offeredCourse: offeredCourseData } = req.body;
  const result = await OfferedCourseService.updateOfferedCourseIntoDB(
    id,
    offeredCourseData,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Offered course is retrieved successfully!",
    data: result,
  });
});

const deleteSingleOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await OfferedCourseService.deleteSingleOfferedCourseFormDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Offered course deleted successfully!",
    data: result,
  });
});

export const OfferedCourseController = {
  createOfferedCourse,
  getAllOfferedCourse,
  getMyOfferedCourse,
  getSingleOfferedCourse,
  updateSingleOfferedCourse,
  deleteSingleOfferedCourse,
};
