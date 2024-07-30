import { Schema, model } from "mongoose";
import { IFaculty, IFacultyModel, IFacultyName } from "./faculty.interface";
import { AppError } from "../../middlewares/AppError";
import httpStatus from "http-status";

// faculty name schema
const facultyNameSchema = new Schema<IFacultyName>({
  firstName: { type: String, required: true, trim: true },
  middleName: { type: String, trim: true },
  lastName: { type: String, required: true, trim: true },
});

// faculty schema
const facultySchema = new Schema<IFaculty, IFacultyModel>(
  {
    id: {
      type: String,
      required: [true, "Faculty ID is required"],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User ID is required"],
      ref: "User",
    },
    name: {
      type: facultyNameSchema,
      required: [true, "Faculty name is required"],
    },
    gender: {
      type: String,
      enum: ["male", "female"],
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
    emergencyNo: {
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
      trim: true,
      default:
        "https://i.ibb.co/T4t96zZ/blank-profile-picture-973460-960-720.webp",
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: [true, "Academic department ID is required"],
      ref: "AcademicDepartment",
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: [true, "Academic faculty ID is required"],
      ref: "AcademicFaculty",
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
facultySchema.virtual("fullName").get(function () {
  return `${this?.name?.firstName} ${this?.name?.middleName ? this?.name?.middleName + " " : ""}${this?.name?.lastName}`;
});

// Pre-find hooks
facultySchema.pre("find", function (next) {
  this.find({ isDeleted: { $eq: false } });
  next();
});

facultySchema.pre("findOne", function (next) {
  this.findOne({ isDeleted: { $eq: false } });
  next();
});

facultySchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $eq: false } } });
  next();
});

// Faculty can't be a duplicate
facultySchema.pre("save", async function (next) {
  const isExistFaculty = await Faculty.findOne({ id: this.id });
  if (isExistFaculty) {
    throw new AppError(httpStatus.NOT_FOUND, "This faculty already exists!");
  }
  next();
});

// Unknown _id validation error for update
facultySchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();
  const isExistingFaculty = await Faculty.findOne(query);
  if (!isExistingFaculty) {
    throw new AppError(httpStatus.NOT_FOUND, "This faculty doesn't exist!");
  }
  next();
});

// Custom static method to check existence
facultySchema.static("findOneOrThrowError", async function (_id: string) {
  const faculty: IFaculty | null = await this.findOne({ _id });
  if (!faculty) {
    throw new AppError(httpStatus.NOT_FOUND, "This faculty doesn't exist!");
  }
  return faculty;
});

export const Faculty = model<IFaculty, IFacultyModel>("Faculty", facultySchema);
