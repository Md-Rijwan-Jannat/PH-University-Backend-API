import httpStatus from "http-status";
import { AppError } from "../../middlewares/AppError";
import {
  IAcademicFaculty,
  IAcademicFacultyModel,
} from "./academicFaculty.interface";
import { Schema, model } from "mongoose";

export const academicFacultySchema = new Schema<
  IAcademicFaculty,
  IAcademicFacultyModel
>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
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

// Faculty can't be a duplicate
academicFacultySchema.pre("save", async function (next) {
  const isExistFaculty = await AcademicFaculty.findOne({
    name: this.name,
  });

  if (isExistFaculty) {
    throw new AppError(httpStatus.NOT_FOUND, "This faculty is already exists!");
  }

  next();
});

//  Unknown _id validation error
academicFacultySchema.pre("find", async function (next) {
  const query = this.getQuery();
  const isExistFaculty = await AcademicFaculty.findOne(query);

  if (!isExistFaculty) {
    throw new AppError(httpStatus.NOT_FOUND, "This faculty doesn't exists!");
  }

  next();
});

// Unknown _id validation error for update
academicFacultySchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();

  const isExistingFaculty = await AcademicFaculty.findOne(query);

  if (!isExistingFaculty) {
    throw new AppError(httpStatus.NOT_FOUND, "This faculty doesn't exist!");
  }

  next();
});

// Custom static method to check existence
academicFacultySchema.static(
  "findOneOrThrowError",
  async function (id: string) {
    const Faculty: IAcademicFaculty | null = await this.findOne({
      _id: id,
    });
    if (!Faculty) {
      throw new AppError(httpStatus.NOT_FOUND, "This faculty doesn't exist!");
    }
    return Faculty;
  },
);

export const AcademicFaculty = model<IAcademicFaculty, IAcademicFacultyModel>(
  "AcademicFaculty",
  academicFacultySchema,
);
