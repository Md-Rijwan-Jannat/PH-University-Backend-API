import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { EnrolledCourseServices } from "./enrolledCourse.service";

const createEnrolledCourse = catchAsync(async (req, res) => {
  const { enrolledCourse: enrolledCourseData } = req.body;
  const result =
    await EnrolledCourseServices.createEnrolledCourseIntoDB(enrolledCourseData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Enrolled Course Created Successfully",
    data: result,
  });
});

export const EnrolledCourseController = {
  createEnrolledCourse,
};
