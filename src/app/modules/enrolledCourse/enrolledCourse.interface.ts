// interfaces/EnrolledCourse.ts
import { Types } from "mongoose";

export interface ICourseMarks {
  classTest1: number;
  midTerm: number;
  classTest2: number;
  finalTerm: number;
}

export interface IResult {
  grade: string;
  gradePoint: number;
}

export interface IEnrolledCourse {
  semesterRegistration: Types.ObjectId;
  academicSemester: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  offeredCourse: Types.ObjectId;
  course: Types.ObjectId;
  faculty: Types.ObjectId;
  student: Types.ObjectId;
  isEnrolled: boolean;
  isComplete: boolean;
  courseMarks: ICourseMarks;
  grade: "A" | "B" | "C" | "D" | "F" | "NA";
  gradePoint: number;
  createdAt: Date;
  updatedAt: Date;
}
