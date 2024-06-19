import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CourseService } from "./course.service";

const createCourse = catchAsync(async (req, res) => {
  const { course: courseData } = req.body;
  const result = await CourseService.createCourseIntoDB(courseData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course is created successfully!",
    data: result,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const result = await CourseService.getAllCoursesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Courses is retrieved successfully!",
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseService.getSingleCourseFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course is retrieved successfully!",
    data: result,
  });
});

const updateSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { course: courseData } = req.body;
  const result = await CourseService.updateSingleCourseIntoDB(id, courseData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course is updated successfully!",
    data: result,
  });
});

const deleteSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseService.deleteSingleCourseFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course is deleted successfully!",
    data: result,
  });
});

const assignFacultiesWithCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;
  const result = await CourseService.assignFacultiesWithCourseIntoDB(
    courseId,
    faculties,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course faculty is assigned successfully!",
    data: result,
  });
});

const removeFacultiesWithCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;
  const result = await CourseService.removeFacultiesWithCourseFromDB(
    courseId,
    faculties,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course faculty is remove successfully!",
    data: result,
  });
});

export const CourseController = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateSingleCourse,
  deleteSingleCourse,
  assignFacultiesWithCourse,
  removeFacultiesWithCourse,
};
