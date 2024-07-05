import mongoose, { model, Schema } from "mongoose";
import { grade } from "./enrolledCourse.constants";
import { IEnrolledCourse } from "./enrolledCourse.interface";

const courseMarksSchema = new Schema({
  classTest1: { type: Number },
  midTerm: { type: Number },
  classTest2: { type: Number },
  finalTerm: { type: Number },
});

const enrolledCourseSchema = new Schema(
  {
    semesterRegistration: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SemesterRegistration",
      required: true,
    },
    academicSemester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicSemester",
      required: true,
    },
    academicFaculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicFaculty",
      required: true,
    },
    academicDepartment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicDepartment",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    faculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    isEnrolled: {
      type: Boolean,
      default: true,
    },
    isComplete: {
      type: Boolean,
      default: false,
    },
    courseMarks: courseMarksSchema,
    grade: {
      type: String,
      enum: grade,
    },
    gradePoint: {
      type: String,
    },
  },
  { timestamps: true },
);

export const EnrolledCourse = model<IEnrolledCourse>(
  "EnrolledCourse",
  enrolledCourseSchema,
);
