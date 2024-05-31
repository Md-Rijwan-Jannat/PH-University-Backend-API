import { Schema, model } from "mongoose";
import {
  IAcademicDepartment,
  IAcademicDepartmentModel,
} from "./academicDepartment.interface";

export const academicDepartmentSchema = new Schema<
  IAcademicDepartment,
  IAcademicDepartmentModel
>(
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

// Department can't be a duplicate
academicDepartmentSchema.pre("save", async function (next) {
  const isExistDepartment = await AcademicDepartment.findOne({
    name: this.name,
  });

  if (isExistDepartment) {
    throw new Error("This department is already exists!");
  }

  next();
});

// Unknown _id validation error for update
academicDepartmentSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();

  const isExistingDepartment = await AcademicDepartment.findOne(query);

  if (!isExistingDepartment) {
    throw new Error("This department doesn't exist!");
  }

  console.log(query._id, isExistingDepartment);

  next();
});

// Custom static method to check existence
academicDepartmentSchema.static(
  "findOneOrThrowError",
  async function (id: string) {
    const department: IAcademicDepartment | null = await this.findOne({
      _id: id,
    });
    if (!department) {
      throw new Error("This department doesn't exist!");
    }
    return department;
  },
);

export const AcademicDepartment = model<
  IAcademicDepartment,
  IAcademicDepartmentModel
>("AcademicDepartment", academicDepartmentSchema);
