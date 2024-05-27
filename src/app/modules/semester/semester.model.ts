// semester.model.ts
import { Schema, model } from "mongoose";
import {
  ISemester,
  TMonths,
  TSemesterCode,
  TSemesterExam,
  TSemesterName,
  TMainDepartment,
  TChildDepartment,
} from "./semester.interface";
import { DepartmentDetails } from "../../utils/department.mapping";

export const months: readonly TMonths[] = DepartmentDetails.Months;

export const semesterName: readonly TSemesterName[] =
  DepartmentDetails.SemesterNames;

export const semesterCode: readonly TSemesterCode[] =
  DepartmentDetails.SemesterCodes;

export const semesterExam: readonly TSemesterExam[] =
  DepartmentDetails.SemesterExams;

export const mainDepartments: readonly TMainDepartment[] =
  DepartmentDetails.MainDepartments;

export const childDepartments: readonly TChildDepartment[] = Object.values(
  DepartmentDetails.DepartmentMapping,
).flat();

export const semesterSchema = new Schema<ISemester>(
  {
    name: {
      type: String,
      enum: semesterName,
      required: true,
    },
    year: {
      type: Date,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      enum: semesterCode,
      required: true,
    },
    startMonth: {
      type: String,
      enum: months,
      required: true,
    },
    endMonth: {
      type: String,
      enum: months,
      required: true,
    },
    exam: {
      type: String,
      enum: semesterExam,
      required: true,
    },
    department: {
      type: String,
      enum: mainDepartments,
      required: true,
    },
    childDepartment: {
      type: String,
      required: true,
      validate: {
        validator: function (value: string) {
          const mainDepartment = (this as any).department as TMainDepartment;
          return DepartmentDetails.DepartmentMapping[mainDepartment].some(
            (child) => child.name === value,
          );
        },
        message: (props) =>
          `${props.value} is not a valid child department for the selected main department.`,
      },
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

export const Semester = model<ISemester>("Semester", semesterSchema);
