import { Types } from "mongoose";

export interface IPreRequisitesCourses {
  course: Types.ObjectId;
  isDeleted: boolean;
}

export interface ICourse {
  title: string;
  prefix: string;
  code: number;
  credits: number;
  preRequisitesCourses: IPreRequisitesCourses[];
  isDeleted: boolean;
}

export interface ICourseFaculty {
  course: Types.ObjectId;
  faculties: [Types.ObjectId];
  isDeleted: boolean;
}
