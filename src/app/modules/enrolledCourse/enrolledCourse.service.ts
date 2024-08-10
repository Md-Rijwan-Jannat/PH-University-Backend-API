import httpStatus from "http-status";
import mongoose from "mongoose";
import { AppError } from "../../middlewares/AppError";
import { OfferedCourse } from "../offeredCourse/offeredCourse.model";
import { IEnrolledCourse, IResult } from "./enrolledCourse.interface";
import { EnrolledCourse } from "./enrolledCourse.model";
import { Student } from "../student/student.model";
import { SemesterRegistration } from "../semesterRegistration.ts/semesterRegistration.model";
import { Course } from "../course/course.model";
import { Faculty } from "../faculty/faculty.model";
import {
  calculateGradeAndPoint,
  calculatePercentage,
  calculateTotalMarks,
} from "./enrolledCourse.utils";

const createEnrolledCourseIntoDB = async (
  userId: string,
  payload: IEnrolledCourse,
) => {
  const session = await mongoose.startSession();

  const { offeredCourse } = payload;

  const isOfferedCourseExists =
    await OfferedCourse.findById(offeredCourse).session(session);

  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Offered Course does not exist");
  }

  if (isOfferedCourseExists.maxCapacity <= 0) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Offered Course is full, please try again later",
    );
  }

  const student = await Student.findOne({ id: userId })
    .select("_id")
    .session(session);

  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, "Student does not exist");
  }

  const isStudentEnrolled = await EnrolledCourse.findOne({
    semesterRegistration: isOfferedCourseExists.semesterRegistration,
    student: student._id,
    offeredCourse,
  }).session(session);

  if (isStudentEnrolled) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Student already enrolled in this course",
    );
  }

  const enrolledCourses = await EnrolledCourse.aggregate([
    {
      $match: {
        semesterRegistration: isOfferedCourseExists.semesterRegistration,
        student: student._id,
      },
    },
    {
      $lookup: {
        from: "courses",
        localField: "course",
        foreignField: "_id",
        as: "EnrolledCourseData",
      },
    },
    {
      $unwind: "$EnrolledCourseData",
    },
    {
      $group: {
        _id: null,
        totalCredits: { $sum: "$EnrolledCourseData.credits" },
      },
    },
    {
      $project: {
        _id: 0,
        totalCredits: 1,
      },
    },
  ]);

  const maxCreditsData = await SemesterRegistration.findById(
    isOfferedCourseExists.semesterRegistration,
    {
      _id: 0,
      maxCredits: 1,
    },
  );

  const course = await Course.findById(isOfferedCourseExists.course, {
    _id: 0,
    credits: 1,
  });

  const totalCredits = enrolledCourses.length
    ? enrolledCourses[0].totalCredits
    : 0;

  const maxCredits = maxCreditsData?.maxCredits || 0;

  if (totalCredits && totalCredits + course?.credits > maxCredits) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You have exceeded the maximum credits allowed for this semester",
    );
  }

  try {
    session.startTransaction();

    const result = await EnrolledCourse.create(
      [
        {
          semesterRegistration: isOfferedCourseExists.semesterRegistration,
          academicSemester: isOfferedCourseExists.academicSemester,
          academicFaculty: isOfferedCourseExists.academicFaculty,
          academicDepartment: isOfferedCourseExists.academicDepartment,
          offeredCourse: offeredCourse,
          course: isOfferedCourseExists.course,
          faculty: isOfferedCourseExists.faculty,
          student: student._id,
          isEnrolled: true,
        },
      ],
      { session },
    );

    if (!result) {
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Error occurred while enrolling student in course",
      );
    }

    await OfferedCourse.findByIdAndUpdate(
      offeredCourse,
      { $inc: { maxCapacity: -1 } },
      { session },
    );

    await session.commitTransaction();
    session.endSession();

    return result;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const updateEnrolledCourseMark = async (
  userId: string,
  payload: Partial<IEnrolledCourse>,
) => {
  const { semesterRegistration, offeredCourse, student, courseMarks } = payload;

  // Check if the offered course exists
  const isOfferedCourseExists = await OfferedCourse.findById(offeredCourse);
  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Offered Course does not exist");
  }

  // Check if the semester registration exists
  const isSemesterRegistrationExists =
    await SemesterRegistration.findById(semesterRegistration);
  if (!isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Semester registration does not exist",
    );
  }

  // Check if the student exists
  const isStudentExists = await Student.findById(student);
  if (!isStudentExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Student does not exist");
  }

  // Check if the faculty exists
  const faculty = await Faculty.findOne({ id: userId }, { _id: 1 });
  if (!faculty) {
    throw new AppError(httpStatus.NOT_FOUND, "Faculty does not exist");
  }

  // Check if the course belongs to the faculty
  const isCourseBelongToFaculty = await EnrolledCourse.findOne({
    semesterRegistration,
    offeredCourse,
    student,
    faculty: faculty._id,
  });

  if (!isCourseBelongToFaculty) {
    throw new AppError(httpStatus.FORBIDDEN, "You are forbidden");
  }

  const MAX_CLASS_TEST_1 = 20;
  const MAX_CLASS_TEST_2 = 20;
  const MAX_MID_TERM = 60;
  const MAX_FINAL_TERM = 90;

  // Validate course marks
  if (courseMarks) {
    if (courseMarks.classTest1 > MAX_CLASS_TEST_1) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `classTest1 cannot exceed ${MAX_CLASS_TEST_1} marks`,
      );
    }
    if (courseMarks.classTest2 > MAX_CLASS_TEST_2) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `classTest2 cannot exceed ${MAX_CLASS_TEST_2} marks`,
      );
    }
    if (courseMarks.midTerm > MAX_MID_TERM) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `midTerm cannot exceed ${MAX_MID_TERM} marks`,
      );
    }
    if (courseMarks.finalTerm > MAX_FINAL_TERM) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `finalTerm cannot exceed ${MAX_FINAL_TERM} marks`,
      );
    }
  }

  const modifiedData: Record<string, unknown> = { ...courseMarks };

  let grade: string = "NA";
  let gradePoint: number = 0;
  let isComplete: boolean = false;

  if (courseMarks?.finalTerm) {
    const { classTest1, midTerm, classTest2, finalTerm } = courseMarks;

    const totalMarks = calculateTotalMarks({
      classTest1,
      midTerm,
      classTest2,
      finalTerm,
    });
    const percentage = calculatePercentage(totalMarks);
    const gradeAndPoint: IResult = calculateGradeAndPoint(percentage);

    grade = gradeAndPoint.grade;
    gradePoint = gradeAndPoint.gradePoint;
    isComplete = true;
  }

  // update course marks dynamically
  if (modifiedData && Object.keys(modifiedData).length) {
    for (const [key, value] of Object.entries(modifiedData)) {
      modifiedData[`courseMarks.${key}`] = value;
    }
  }

  const result = await EnrolledCourse.findByIdAndUpdate(
    isCourseBelongToFaculty._id,
    {
      courseMarks: modifiedData,
      grade,
      gradePoint,
      isComplete,
    },
    { new: true },
  );

  return result;
};

export const EnrolledCourseServices = {
  createEnrolledCourseIntoDB,
  updateEnrolledCourseMark,
};
