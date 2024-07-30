// admin.interface.ts
import { Model, Types } from "mongoose";

export interface IAdminName {
  firstName: string;
  middleName?: string;
  lastName: string;
}

export interface IAdmin {
  id: string;
  user: Types.ObjectId;
  name: IAdminName;
  gender: "male" | "female";
  religion: "Islam" | "Hindu" | "Christian" | "Buddhist" | "Others";
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  email: string;
  dateOfBirth: string;
  contactNo: string;
  emergencyNo: string;
  presentAddress: string;
  permanentAddress: string;
  profileImage: string;
  // managementDepartment: Types.ObjectId;
  isDeleted: boolean;
}

export interface IAdminModel extends Model<IAdmin> {
  findOneOrThrowError(id: string): Promise<IAdmin>;
}
