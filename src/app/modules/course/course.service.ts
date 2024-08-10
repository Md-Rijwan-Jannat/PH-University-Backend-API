import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import { AppError } from "../../middlewares/AppError";
import { courseSearchableFields } from "./course.constsnts";
import { ICourse, ICourseFaculty } from "./course.interface";
import { Course, CourseFaculty } from "./course.model";
import mongoose from "mongoose";

const createCourseIntoDB = async (payload: ICourse) => {
  const result = (await Course.create(payload)).populate(
    "preRequisitesCourses.course",
  );
  return result;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQueryBuilder = new QueryBuilder(
    Course.find().populate("preRequisitesCourses.course"),
    query,
  )
    .search(courseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await courseQueryBuilder.modelQuery;
  const meta = await courseQueryBuilder.countTotal();
  return {
    meta,
    result,
  };
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    "preRequisitesCourses.course",
  );
  return result;
};

const updateSingleCourseIntoDB = async (
  id: string,
  payload: Partial<ICourse>,
) => {
  const { preRequisitesCourses, ...courseRemainingData } = payload;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const updateBasicCourseInfo = await Course.findByIdAndUpdate(
      id,
      courseRemainingData,
      {
        new: true,
        session,
      },
    ).populate("preRequisitesCourses.course");

    if (!updateBasicCourseInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, "Course update failed!");
    }

    if (preRequisitesCourses && preRequisitesCourses.length > 0) {
      // Filtering the prerequisite course IDs to delete
      const deletedPreRequisiteId = preRequisitesCourses
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);

      if (deletedPreRequisiteId.length > 0) {
        // Deleting the prerequisite courses
        const deletePreRequisitesCourses = await Course.findByIdAndUpdate(
          id,
          {
            $pull: {
              preRequisitesCourses: { course: { $in: deletedPreRequisiteId } },
            },
          },
          {
            new: true,
            session,
          },
        );

        if (!deletePreRequisitesCourses) {
          throw new AppError(httpStatus.BAD_REQUEST, "Course update failed!");
        }
      }

      // Filtering the new prerequisite courses to add
      const newPreRequisite = preRequisitesCourses.filter(
        (el) => el.course && !el.isDeleted,
      );

      if (newPreRequisite.length > 0) {
        // Adding the new prerequisite courses
        const newPreRequisiteCourse = await Course.findByIdAndUpdate(
          id,
          {
            $addToSet: { preRequisitesCourses: { $each: newPreRequisite } },
          },
          {
            new: true,
            session,
          },
        );

        if (!newPreRequisiteCourse) {
          throw new AppError(httpStatus.BAD_REQUEST, "Course update failed!");
        }
      }
    }

    const result = await Course.findById(id).populate(
      "preRequisitesCourses.course",
    );

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, "Course update failed!");
  }
};

const deleteSingleCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  ).populate("preRequisitesCourses.course");
  return result;
};

const assignFacultiesWithCourseIntoDB = async (
  id: string,
  payload: Partial<ICourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: payload } },
    },
    {
      upsert: true,
      new: true,
    },
  );
  return result;
};

const getAssignFacultiesWithCourseIntoDB = async (courseId: string) => {
  const result = await CourseFaculty.findOne({ course: courseId }).populate(
    "faculties",
  );
  return result;
};

const removeFacultiesWithCourseFromDB = async (
  id: string,
  payload: Partial<ICourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $pull: { faculties: { $in: payload } },
    },
    {
      new: true,
    },
  );
  return result;
};

export const CourseService = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  updateSingleCourseIntoDB,
  deleteSingleCourseFromDB,
  assignFacultiesWithCourseIntoDB,
  getAssignFacultiesWithCourseIntoDB,
  removeFacultiesWithCourseFromDB,
};
