// student.model.ts
import { Schema, model } from "mongoose";
import {
  IGuardian,
  ILocalGuardian,
  IStudent,
  IStudentModel,
  IStudentName,
} from "./student.interface";
import { AppError } from "../../middlewares/errorHandler";
import httpStatus from "http-status";

// student name schema
const studentNameSchema = new Schema<IStudentName>({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
});

// student guardian schema
const guardianSchema = new Schema<IGuardian>({
  fatherName: {
    type: String,
    required: true,
    trim: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
    trim: true,
  },
  motherName: {
    type: String,
    required: true,
    trim: true,
  },
  motherContactNo: {
    type: String,
    required: true,
    trim: true,
  },
  motherOccupation: {
    type: String,
    required: true,
    trim: true,
  },
});

// student local guardian schema
const localGuardianSchema = new Schema<ILocalGuardian>({
  name: { type: String, required: true, trim: true },
  contactNo: { type: String, required: true, unique: true, trim: true },
  address: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
});

// student schema
const studentSchema = new Schema<IStudent, IStudentModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: studentNameSchema,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },
    religion: {
      type: String,
      enum: ["Islam", "Hindu", "Christian", "Buddhist", "Others"],
      required: true,
      trim: true,
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
      trim: true,
    },
    contactNo: {
      type: String,
      required: true,
      trim: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
      trim: true,
    },
    presentAddress: {
      type: String,
      required: true,
      trim: true,
    },
    permanentAddress: {
      type: String,
      required: true,
      trim: true,
    },
    localGuardian: {
      type: localGuardianSchema,
      required: true,
    },
    guardian: {
      type: guardianSchema,
      required: true,
    },
    profileImage: {
      type: String,
      required: true,
    },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Semester",
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "AcademicDepartment",
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  },
);

// virtual
studentSchema.virtual("fullName").get(function () {
  return `${this.name.firstName} ${this.name.middleName ? this.name.middleName + " " : ""}${this.name.lastName}`;
});

// Pre-find hooks
studentSchema.pre("find", function (next) {
  this.find({ isDeleted: { $eq: false } });
  next();
});

studentSchema.pre("findOne", function (next) {
  this.findOne({ isDeleted: { $eq: false } });
  next();
});

studentSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $eq: false } } });
  next();
});

// Student can't be a duplicate
studentSchema.pre("save", async function (next) {
  const isExistStudent = await Student.findOne({
    id: this.id,
  });

  if (isExistStudent) {
    throw new AppError(httpStatus.NOT_FOUND, "This student already exists!");
  }
  next();
});

// Unknown _id validation error for update
studentSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();
  const isExistingStudent = await Student.findOne(query);
  if (!isExistingStudent) {
    throw new AppError(httpStatus.NOT_FOUND, "This student doesn't exist!");
  }
  next();
});

// Custom static method to check existence
studentSchema.static("findOneOrThrowError", async function (id: string) {
  const student: IStudent | null = await this.findOne({ id });
  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, "This student doesn't exist!");
  }
  return student;
});

export const Student = model<IStudent, IStudentModel>("Student", studentSchema);
