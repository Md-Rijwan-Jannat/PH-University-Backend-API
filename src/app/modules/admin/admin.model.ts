import { Schema, model } from "mongoose";
import { IAdmin, IAdminModel, IAdminName } from "./admin.interface";
import { AppError } from "../../middlewares/appError";
import httpStatus from "http-status";

// admin name schema
const adminNameSchema = new Schema<IAdminName>({
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

// admin schema
const adminSchema = new Schema<IAdmin, IAdminModel>(
  {
    id: {
      type: String,
      required: [true, "Admin ID is required"],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User ID is required"],
      ref: "User",
    },
    name: { type: adminNameSchema, required: [true, "Name is required"] },
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
    profileImage: {
      type: String,
      required: [true, "Profile image is required"],
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// virtual
adminSchema.virtual("fullName").get(function () {
  return `${this?.name?.firstName} ${this?.name?.middleName ? this?.name?.middleName + " " : ""}${this?.name?.lastName}`;
});

// Pre-find hooks
adminSchema.pre("find", function (next) {
  this.find({ isDeleted: { $eq: false } });
  next();
});

adminSchema.pre("findOne", function (next) {
  this.findOne({ isDeleted: { $eq: false } });
  next();
});

adminSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $eq: false } } });
  next();
});

// Admin can't be a duplicate
adminSchema.pre("save", async function (next) {
  const isExistAdmin = await Admin.findOne({ id: this.id });
  if (isExistAdmin) {
    throw new AppError(httpStatus.NOT_FOUND, "This admin already exists!");
  }
  next();
});

//  Unknown _id validation error
adminSchema.pre("find", async function (next) {
  const query = this.getQuery();
  const isExistAdmin = await Admin.findOne(query);
  if (!isExistAdmin) {
    throw new AppError(httpStatus.NOT_FOUND, "This admin doesn't exist!");
  }
  next();
});

// Unknown _id validation error for update
adminSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();
  const isExistingAdmin = await Admin.findOne(query);
  if (!isExistingAdmin) {
    throw new AppError(httpStatus.NOT_FOUND, "This admin doesn't exist!");
  }
  next();
});

// Custom static method to check existence
adminSchema.static("findOneOrThrowError", async function (id: string) {
  const admin: IAdmin | null = await this.findOne({ id });
  if (!admin) {
    throw new AppError(httpStatus.NOT_FOUND, "This admin doesn't exist!");
  }
  return admin;
});

export const Admin = model<IAdmin, IAdminModel>("Admin", adminSchema);
