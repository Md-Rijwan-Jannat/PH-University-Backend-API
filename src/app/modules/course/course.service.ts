import QueryBuilder from "../../builder/QueryBuilder";
import { courseSearchableFields } from "./course.constsnts";
import { ICourse, ICourseFaculty } from "./course.interface";
import {
  Course,
  CourseFaculty,
  preRequisitesCoursesSchema,
} from "./course.model";

const createCourseIntoDB = async (payload: ICourse) => {
  const result = (await Course.create(payload)).populate(
    "preRequisitesCourses.course",
  );
  return result;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate("preRequisitesCourses.course"),
    query,
  )
    .search(courseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await courseQuery.modelQuery;
  return result;
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
  const { preRequisitesCourses, ...remainingCoursesData } = payload;

  const updateBasicCourseData = await Course.findByIdAndUpdate(
    id,
    remainingCoursesData,
    {
      new: true,
    },
  ).populate("preRequisitesCourses.course");

  if (preRequisitesCourses && preRequisitesCourses.length > 0) {
    // filtering deleted pre Requisites course id
    const deletedPreRequisiteId = preRequisitesCourses
      .filter((el) => el.course && el.isDeleted)
      .map((el) => el.course);

    // delete this preRequisite course
    const deletedPreRequisitesCourses = await Course.findByIdAndUpdate(id, {
      $pull: {
        preRequisitesCourses: { course: { $in: deletedPreRequisiteId } },
      },
    });

    // filtering new pre Requisites course data
    const newPreRequisites = preRequisitesCourses.filter(
      (el) => el.course && !el.isDeleted,
    );
    console.log({ newPreRequisites });

    // added new preRequisite data
    const newPreRequisiteCourse = await Course.findByIdAndUpdate(id, {
      $addToSet: { preRequisitesCourses: { $each: newPreRequisites } },
    });
  }

  const result = await Course.findById(id).populate(
    "preRequisitesCourses.course",
  );

  return result;
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
  removeFacultiesWithCourseFromDB,
};
