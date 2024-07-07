import { Model, Types } from "mongoose";

export interface ISemesterRegistration {
  academicSemester: Types.ObjectId;
  status: "UPCOMING" | "ONGOING" | "ENDED";
  startDate: Date;
  endDate: Date;
  minCredits: number;
  maxCredits: number;
}

export interface SemesterRegistrationModel
  extends Model<ISemesterRegistration> {
  isExistingSemesterRegistration: (
    id: Types.ObjectId,
  ) => Promise<ISemesterRegistration | null>;
}
