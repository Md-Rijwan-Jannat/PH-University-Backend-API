import mongoose, { model, Schema } from "mongoose";
import { grade } from "./enrolledCourse.constants";
import { IEnrolledCourse } from "./enrolledCourse.interface";

const courseMarksSchema = new Schema({
  classTest1: {
    type: Number,
    min: 0,
    max: 20,
    default: 0,
  },
  midTerm: {
    type: Number,
    min: 0,
    max: 60,
    default: 0,
  },
  classTest2: {
    type: Number,
    min: 0,
    max: 40,
    default: 0,
  },
  finalTerm: {
    type: Number,
    min: 0,
    max: 90,
    default: 0,
  },
});

const enrolledCourseSchema = new Schema(
  {
    semesterRegistration: {
      type: Schema.Types.ObjectId,
      required: [true, "Semester registration id is required"],
      trim: true,
      ref: "SemesterRegistration",
    },
    academicSemester: {
      type: Schema.Types.ObjectId,
      required: [true, "Academic semester id is required"],
      trim: true,
      ref: "Semester",
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: [true, "Academic department id is required"],
      trim: true,
      ref: "AcademicDepartment",
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: [true, "Academic faculty id is required"],
      trim: true,
      ref: "AcademicFaculty",
    },
    offeredCourse: {
      type: Schema.Types.ObjectId,
      required: [true, "Offered course id is required"],
      trim: true,
      ref: "OfferedCourse",
    },
    course: {
      type: Schema.Types.ObjectId,
      required: [true, "course id is required"],
      trim: true,
      ref: "Course",
    },
    faculty: {
      type: Schema.Types.ObjectId,
      required: [true, "Faculty id is required"],
      trim: true,
      ref: "Faculty",
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Student id is required"],
      ref: "Student",
    },
    isEnrolled: {
      type: Boolean,
      default: false,
    },
    isComplete: {
      type: Boolean,
      default: false,
    },
    courseMarks: {
      type: courseMarksSchema,
      default: {},
    },
    grade: {
      type: String,
      enum: grade,
      default: "NA",
    },
    gradePoint: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

export const EnrolledCourse = model<IEnrolledCourse>(
  "EnrolledCourse",
  enrolledCourseSchema,
);
