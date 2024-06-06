// student.interface.ts
import { Model, Types } from "mongoose";

export interface IStudentName {
  firstName: string;
  middleName?: string;
  lastName: string;
}

export interface IGuardian {
  fatherName: string;
  fatherContactNo: string;
  fatherOccupation: string;
  motherName: string;
  motherContactNo: string;
  motherOccupation: string;
}

export interface ILocalGuardian {
  name: string;
  contactNo: string;
  address: string;
  email: string;
}

export interface IStudent {
  id: string;
  user: Types.ObjectId;
  name: IStudentName;
  gender: "male" | "female";
  religion: "Islam" | "Hindu" | "Christian" | "Buddhist" | "Others";
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  email: string;
  dateOfBirth: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  localGuardian: ILocalGuardian;
  guardian: IGuardian;
  profileImage: string;
  academicDepartment: Types.ObjectId;
  admissionSemester: Types.ObjectId;
  isDeleted: boolean;
}

export interface IStudentModel extends Model<IStudent> {
  isUserExists(id: string): Promise<IStudent | null>;
}
