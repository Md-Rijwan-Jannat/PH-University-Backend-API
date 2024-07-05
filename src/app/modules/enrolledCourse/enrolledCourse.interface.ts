// interfaces/EnrolledCourse.ts
import { ObjectId } from "mongoose";

export interface ICourseMarks {
  classTest1: number;
  midTerm: number;
  classTest2: number;
  finalTerm: number;
}

export interface IEnrolledCourse {
  _id: ObjectId;
  semesterRegistration: ObjectId;
  academicSemester: ObjectId;
  academicFaculty: ObjectId;
  academicDepartment: ObjectId;
  course: ObjectId;
  faculty: ObjectId;
  student: ObjectId;
  isEnrolled: boolean;
  isComplete: boolean;
  courseMarks: ICourseMarks;
  grade: "A" | "B" | "C" | "D" | "F" | "NA";
  gradePoint: string;
  createdAt: Date;
  updatedAt: Date;
}
