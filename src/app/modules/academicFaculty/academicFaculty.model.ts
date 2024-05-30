import { IAcademicFaculty } from "./academicFaculty.interface";
import { Schema, model } from "mongoose";

export const academicFacultySchema = new Schema<IAcademicFaculty>(
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

academicFacultySchema.pre("save", async function (next) {
  const isExistFaculty = await AcademicFaculty.findOne({
    name: this.name,
  });

  if (isExistFaculty) {
    throw new Error("This faculty is already exists!");
  }

  next();
});

export const AcademicFaculty = model<IAcademicFaculty>(
  "AcademicFaculty",
  academicFacultySchema,
);
