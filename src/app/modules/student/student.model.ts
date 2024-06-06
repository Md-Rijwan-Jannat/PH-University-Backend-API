import { Schema, model } from "mongoose";
import {
  IGuardian,
  ILocalGuardian,
  IStudent,
  IStudentModel,
  IStudentName,
} from "./student.interface";
import { AppError } from "../../middlewares/appError";
import httpStatus from "http-status";

// student name schema
const studentNameSchema = new Schema<IStudentName>({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
  },
  middleName: { type: String, trim: true },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
  },
});

// student guardian schema
const guardianSchema = new Schema<IGuardian>({
  fatherName: {
    type: String,
    required: [true, "Father name is required"],
    trim: true,
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father contact number is required"],
    unique: true,
    trim: true,
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father occupation is required"],
    trim: true,
  },
  motherName: {
    type: String,
    required: [true, "Mother name is required"],
    trim: true,
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother contact number is required"],
    trim: true,
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother occupation is required"],
    trim: true,
  },
});

// student local guardian schema
const localGuardianSchema = new Schema<ILocalGuardian>({
  name: {
    type: String,
    required: [true, "Local guardian name is required"],
    trim: true,
  },
  contactNo: {
    type: String,
    required: [true, "Local guardian contact number is required"],
    unique: true,
    trim: true,
  },
  address: {
    type: String,
    required: [true, "Local guardian address is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Local guardian email is required"],
    unique: true,
    trim: true,
  },
});

// student schema
const studentSchema = new Schema<IStudent, IStudentModel>(
  {
    id: {
      type: String,
      required: [true, "Student ID is required"],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User id is required"],
      ref: "User",
    },
    name: { type: studentNameSchema, required: [true, "Name is required"] },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: [true, "Gender is required"],
    },
    religion: {
      type: String,
      enum: ["Islam", "Hindu", "Christian", "Buddhist", "Others"],
      required: [true, "Religion is required"],
      trim: true,
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
    },
    dateOfBirth: {
      type: String,
      required: [true, "Date of birth is required"],
      trim: true,
    },
    contactNo: {
      type: String,
      required: [true, "Contact number is required"],
      trim: true,
    },
    emergencyContactNo: {
      type: String,
      required: [true, "Emergency contact number is required"],
      trim: true,
    },
    presentAddress: {
      type: String,
      required: [true, "Present address is required"],
      trim: true,
    },
    permanentAddress: {
      type: String,
      required: [true, "Permanent address is required"],
      trim: true,
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, "Local guardian details are required"],
    },
    guardian: {
      type: guardianSchema,
      required: [true, "Guardian details are required"],
    },
    profileImage: {
      type: String,
      required: [true, "Profile image is required"],
    },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      required: [true, "Admission semester is required"],
      ref: "Semester",
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: [true, "Academic department is required"],
      ref: "AcademicDepartment",
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

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
  const isExistStudent = await Student.findOne({ id: this.id });
  if (isExistStudent) {
    throw new AppError(httpStatus.NOT_FOUND, "This student already exists!");
  }
  next();
});

// Unknown _id validation error
studentSchema.pre("find", async function (next) {
  const query = this.getQuery();
  const isExistStudent = await Student.findOne(query);
  if (!isExistStudent) {
    throw new AppError(httpStatus.NOT_FOUND, "This student doesn't exist!");
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
