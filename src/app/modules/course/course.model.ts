import { Schema, model } from "mongoose";
import {
  ICourse,
  ICourseFaculty,
  IPreRequisitesCourses,
} from "./course.interface";

export const preRequisitesCoursesSchema = new Schema<IPreRequisitesCourses>({
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const courseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      required: [true, "Course title is required"],
      unique: true,
      trim: true,
    },
    prefix: {
      type: String,
      required: [true, "Course prefix is required"],
      trim: true,
    },
    code: {
      type: Number,
      required: [true, "Course code is required"],
      trim: true,
    },
    credits: {
      type: Number,
      required: [true, "Course credits is required"],
      trim: true,
    },
    preRequisitesCourses: {
      type: [preRequisitesCoursesSchema],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const courseFacultySchema = new Schema<ICourseFaculty>(
  {
    course: {
      type: Schema.Types.ObjectId,
      required: [true, "Course is is required"],
      unique: true,
      ref: "Course",
    },
    faculties: {
      type: [Schema.Types.ObjectId],
      ref: "Faculty",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Course = model<ICourse>("Course", courseSchema);

export const CourseFaculty = model<ICourseFaculty>(
  "CourseFaculty",
  courseFacultySchema,
);
