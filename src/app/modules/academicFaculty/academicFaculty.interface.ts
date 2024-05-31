import { Model } from "mongoose";

export interface IAcademicFaculty {
  _id: string;
  name: string;
  isDeleted: boolean;
}

export interface IAcademicFacultyModel extends Model<IAcademicFaculty> {
  findOneOrThrowError: (id: string) => Promise<IAcademicFaculty>;
}
