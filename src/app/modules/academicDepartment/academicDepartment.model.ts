import { Schema, model } from "mongoose";
import { IAcademicDepartment } from "./academicDepartment.interface";

export const academicDepartmentSchema = new Schema<IAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: true,
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

academicDepartmentSchema.pre("save", async function (next) {
  const isExistDepartment = await AcademicDepartment.findOne({
    name: this.name,
  });

  if (isExistDepartment) {
    throw new Error("This department is already exists!");
  }

  next();
});

export const AcademicDepartment = model<IAcademicDepartment>(
  "AcademicDepartment",
  academicDepartmentSchema,
);
