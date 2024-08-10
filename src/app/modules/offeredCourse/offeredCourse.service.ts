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
import { Student } from "../student/student.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { offeredCourseSearchableFields } from "./offeredCourse.constants";

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

const getAllOfferedCourseFromDB = async (query: Record<string, unknown>) => {
  const offeredCourseQueryBuilder = new QueryBuilder(
    OfferedCourse.find()
      .populate("semesterRegistration")
      .populate("academicSemester")
      .populate("academicFaculty")
      .populate("academicDepartment")
      .populate("course")
      .populate("faculty"),
    query,
  )
    .search(offeredCourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await offeredCourseQueryBuilder.modelQuery;
  const meta = await offeredCourseQueryBuilder.countTotal();

  return {
    meta,
    result,
  };
};

const getMyOfferedCourseFromDB = async (
  userId: string,
  query: Record<string, unknown>,
) => {
  const student = await Student.findOne({ id: userId });

  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, "Student not found");
  }

  if (!student.academicDepartment) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic department not found");
  }

  if (!student.academicFaculty) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic faculty not found");
  }

  const currentOngoingRegistrationSemester = await SemesterRegistration.findOne(
    { status: "UPCOMING" },
  );

  if (!currentOngoingRegistrationSemester) {
    throw new AppError(httpStatus.NOT_FOUND, "There is no ongoing semester");
  }

  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = (page - 1) * limit;

  const aggregationQuery = [
    {
      $match: {
        semesterRegistration: currentOngoingRegistrationSemester?._id,
        academicFaculty: student.academicFaculty,
        academicDepartment: student.academicDepartment,
      },
    },
    {
      $lookup: {
        from: "courses",
        localField: "course",
        foreignField: "_id",
        as: "course",
      },
    },
    {
      $unwind: "$course",
    },
    {
      $lookup: {
        from: "enrolledcourses",
        let: {
          currentOngoingRegistrationSemester:
            currentOngoingRegistrationSemester?._id,
          currentStudent: student._id,
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: [
                      "$semesterRegistration",
                      "$$currentOngoingRegistrationSemester",
                    ],
                  },
                  {
                    $eq: ["$student", "$$currentStudent"],
                  },
                  {
                    $eq: ["$isEnrolled", true],
                  },
                ],
              },
            },
          },
        ],
        as: "enrolledCourses",
      },
    },
    {
      $lookup: {
        from: "enrolledcourses",
        let: {
          currentStudent: student._id,
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ["$student", "$$currentStudent"],
                  },
                  {
                    $eq: ["$isComplete", true],
                  },
                ],
              },
            },
          },
        ],
        as: "completedCourses",
      },
    },
    {
      $addFields: {
        completedCourseIds: {
          $map: {
            input: "$completedCourses",
            as: "completed",
            in: "$$completed.course",
          },
        },
      },
    },
    {
      $addFields: {
        isPreRequisitesFullFilled: {
          $or: [
            { $eq: ["$course.preRequisitesCourses", []] },
            {
              $setIsSubset: [
                "$course.preRequisitesCourses.course",
                "$completedCourseIds",
              ],
            },
          ],
        },
        isAlreadyEnrolled: {
          $in: [
            "$course._id",
            {
              $map: {
                input: "$enrolledCourses",
                as: "enrolledCourse",
                in: "$$enrolledCourse.course",
              },
            },
          ],
        },
      },
    },
    {
      $match: {
        isAlreadyEnrolled: false,
        isPreRequisitesFullFilled: true,
      },
    },
  ];

  const paginationQuery = [
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
  ];

  const result = await OfferedCourse.aggregate([
    ...aggregationQuery,
    ...paginationQuery,
  ]);

  const total = (await OfferedCourse.aggregate([...aggregationQuery])).length;
  const totalPage = Math.ceil(result.length / limit);

  return {
    meta: {
      limit,
      page,
      total,
      totalPage,
    },
    result,
  };
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
  getMyOfferedCourseFromDB,
  getSingleOfferedCourseFromDB,
  updateOfferedCourseIntoDB,
  deleteSingleOfferedCourseFormDB,
};
