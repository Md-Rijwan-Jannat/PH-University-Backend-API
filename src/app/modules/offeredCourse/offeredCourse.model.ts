import { Schema, model } from "mongoose";
import { IOfferedCourse, TDays } from "./offeredCourse.interface";
import { Days } from "./offeredCourse.constants";

const offeredCourseSchema = new Schema<IOfferedCourse>(
  {
    semesterRegistration: {
      type: Schema.Types.ObjectId,
      ref: "SemesterRegistration",
      required: [true, "SemesterRegistration id is required"],
    },
    academicSemester: {
      type: Schema.Types.ObjectId,
      ref: "Semester",
      required: [true, "AcademicSemester id is required"],
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: "AcademicFaculty",
      required: [true, "AcademicFaculty id is required"],
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: "AcademicDepartment",
      required: [true, "AcademicDepartment id is required"],
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "Course id is required"],
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: "Faculty",
      required: [true, "Faculty id is required"],
    },
    maxCapacity: {
      type: Number,
      required: [true, "Max capacity is required"],
    },
    session: {
      type: Number,
      required: [true, "Session is required"],
    },
    days: {
      type: [String],
      enum: Days,
      required: [true, "Days is required"],
    },
    startTime: {
      type: String,
      required: [true, "Start time is required"],
    },
    endTime: {
      type: String,
      required: [true, "End time is required"],
    },
  },
  {
    timestamps: true,
  },
);

export const OfferedCourse = model<IOfferedCourse>(
  "OfferedCourse",
  offeredCourseSchema,
);
