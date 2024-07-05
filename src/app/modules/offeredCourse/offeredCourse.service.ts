import httpStatus from "http-status";
import { AppError } from "../../middlewares/AppError";
import { SemesterRegistration } from "../semesterRegistration.ts/semesterRegistration.model";
import { IOfferedCourse } from "./offeredCourse.interface";
import { OfferedCourse } from "./offeredCourse.model";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { Course } from "../course/course.model";
import { Faculty } from "../faculty/faculty.model";
import { HashScheduleConflict } from "./offeredCourse.utils";

const createOfferedCourseIntoDB = async (payload: IOfferedCourse) => {
  const {
    semesterRegistration,
    academicDepartment,
    academicFaculty,
    course,
    faculty,
    session,
    days,
    startTime,
    endTime,
  } = payload;

  const isSemesterRegistrationExists =
    await SemesterRegistration.findById(semesterRegistration);

  const academicSemester = isSemesterRegistrationExists?.academicSemester;

  if (!isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Semester Registration does not exist!",
    );
  }

  const isAcademicDepartmentExists =
    await AcademicDepartment.findById(academicDepartment);

  if (!isAcademicDepartmentExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Academic department does not exist!",
    );
  }

  const isAcademicFacultyExists =
    await AcademicFaculty.findById(academicFaculty);

  if (!isAcademicFacultyExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Academic faculty does not exist!",
    );
  }

  const isCourseExists = await Course.findById(course);

  if (!isCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Course does not exist!");
  }

  const isFacultyExists = await Faculty.findById(faculty);

  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Faculty does not exist!");
  }

  // Check if academicDepartment belongs to the academicFaculty
  const isAcademicDepartmentWithBelongToAcademicFacultyExists =
    await AcademicDepartment.findOne({
      _id: academicDepartment,
      academicFaculty,
    });

  if (!isAcademicDepartmentWithBelongToAcademicFacultyExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `The ${isAcademicDepartmentExists.name} does not belong to the ${isAcademicFacultyExists.name}!`,
    );
  }

  // check if same on  offered course session, course and semester registration exists

  const isSemesterRegistrationSameAndSessionSameAndCourseSameExists =
    await OfferedCourse.findOne({
      semesterRegistration,
      course,
      session,
    });

  if (isSemesterRegistrationSameAndSessionSameAndCourseSameExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      "This offered course session already exists!",
    );
  }

  const assignedSchedule = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  });

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (HashScheduleConflict(assignedSchedule, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      "This faculty does not available now, chose another time and set new schedule!",
    );
  }
  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;

  // return null;
};

const getAllOfferedCourseFromDB = async () => {
  const result = await OfferedCourse.find()
    .populate("semesterRegistration")
    .populate("academicSemester")
    .populate("academicFaculty")
    .populate("academicDepartment")
    .populate("course")
    .populate("faculty");
  return result;
};

const getSingleOfferedCourseFromDB = async (id: string) => {
  const result = await OfferedCourse.findById(id)
    .populate("semesterRegistration")
    .populate("academicSemester")
    .populate("academicFaculty")
    .populate("academicDepartment")
    .populate("course")
    .populate("faculty");
  return result;
};

const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Pick<
    IOfferedCourse,
    | "semesterRegistration"
    | "faculty"
    | "days"
    | "maxCapacity"
    | "startTime"
    | "endTime"
  >,
) => {
  const { faculty, days, startTime, endTime } = payload;

  const isOfferedCourseExisting = await OfferedCourse.findById(id);

  if (!isOfferedCourseExisting) {
    throw new AppError(httpStatus.NOT_FOUND, "Offered course not found!");
  }

  const semesterRegistration = isOfferedCourseExisting.semesterRegistration;

  const isFacultyExisting = await Faculty.findById(faculty);

  if (!isFacultyExisting) {
    throw new AppError(httpStatus.NOT_FOUND, "Faculty can not found!");
  }

  const isSemesterRegistrationExisting =
    await SemesterRegistration.findById(semesterRegistration);

  if (isSemesterRegistrationExisting?.status !== "UPCOMING") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This semester can't update, because it is ${isSemesterRegistrationExisting?.status}`,
    );
  }

  const assignedSchedule = await OfferedCourse.find({
    startTime,
    endTime,
    days: { $in: days },
  }).select("days startTime endTime");
  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (HashScheduleConflict(assignedSchedule, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      "The selected faculty is not available at the specified day and time. Please choose a different schedule!",
    );
  }
  const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteSingleOfferedCourseFormDB = async (id: string) => {
  const isOfferedCourseExists = await OfferedCourse.findById(id);

  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Offered course not found!");
  }

  const semesterRegistration = isOfferedCourseExists.semesterRegistration;

  const isSemesterRegistrationStatus =
    await SemesterRegistration.findById(semesterRegistration);

  if (isSemesterRegistrationStatus?.status !== "UPCOMING") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This offered course can't deleted, because it is ${isSemesterRegistrationStatus?.status}`,
    );
  }

  const result = await OfferedCourse.findByIdAndDelete(id);
  return result;
};

export const OfferedCourseService = {
  createOfferedCourseIntoDB,
  getAllOfferedCourseFromDB,
  getSingleOfferedCourseFromDB,
  updateOfferedCourseIntoDB,
  deleteSingleOfferedCourseFormDB,
};
