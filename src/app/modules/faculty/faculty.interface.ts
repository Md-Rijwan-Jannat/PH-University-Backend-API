// faculty.interface.ts
import { Model, Types } from "mongoose";

export interface IFacultyName {
  firstName: string;
  middleName?: string;
  lastName: string;
}

export interface IFaculty {
  id: string;
  user: Types.ObjectId;
  name: IFacultyName;
  gender: "male" | "female";
  religion: "Islam" | "Hindu" | "Christian" | "Buddhist" | "Others";
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  email: string;
  dateOfBirth: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  profileImage: string;
  academicDepartment: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  isDeleted: boolean;
}

export interface IFacultyModel extends Model<IFaculty> {
  findOneOrThrowError(id: string): Promise<IFaculty>;
}
