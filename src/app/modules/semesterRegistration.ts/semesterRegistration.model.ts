import { Schema, model } from "mongoose";
import {
  ISemesterRegistration,
  SemesterRegistrationModel,
} from "./semesterRegistration.interface";
import {
  registrationStatus,
  semesterRegistrationStatus,
} from "./semesterRegistration.constants";
import httpStatus from "http-status";
import { AppError } from "../../middlewares/AppError";
import { Semester } from "../semester/semester.model";

export const semesterRegistrationSchema = new Schema<
  ISemesterRegistration,
  SemesterRegistrationModel
>(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      required: [true, "Academic semester id is required"],
      unique: true,
      ref: "Semester",
    },
    status: {
      type: String,
      enum: semesterRegistrationStatus,
      default: "UPCOMING",
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    endDate: {
      type: Date,
      required: [true, "End date is required"],
    },
    minCredits: {
      type: Number,
      default: 15,
    },
    maxCredits: {
      type: Number,
      default: 3,
    },
  },
  {
    timestamps: true,
  },
);

// Pre-save hook to validate academicSemester existence and status
semesterRegistrationSchema.pre("save", async function (next) {
  // Check if there is any semester with status registrationStatus.UPCOMING or registrationStatus.ONGOING
  const semesterRegistrationIUpcomingOrOngoing =
    await SemesterRegistration.findOne({
      $or: [
        { status: registrationStatus.UPCOMING },
        { status: registrationStatus.ONGOING },
      ],
    });

  if (semesterRegistrationIUpcomingOrOngoing) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Another semester is ${semesterRegistrationIUpcomingOrOngoing.status}, can't registration new semester`,
    );
  }

  // Check if the academic semester exists
  const academicSemesterExists = await Semester.findById(this.academicSemester);
  if (!academicSemesterExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic Semester not found!");
  }

  next();
});

// Pre-findOneAndUpdate hook to ensure ENDED semester can't be updated
semesterRegistrationSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();
  // Find the current semester registration document based on the query
  const currentSemester = await SemesterRegistration.findById(query);
  const requestedData = this.getUpdate() as Partial<ISemesterRegistration>;
  const requestedStatus = requestedData?.status;
  const currentStatus = currentSemester?.status;

  if (!currentSemester) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Semester registration not found!",
    );
  }

  // Check UPCOMING --> ONGOING --> ENDED it's can't revert

  if (
    currentStatus === registrationStatus.ENDED &&
    requestedStatus !== registrationStatus.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Cannot update an ${currentStatus} semester registration!`,
    );
  }

  if (
    currentStatus === registrationStatus.UPCOMING &&
    requestedStatus === registrationStatus.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `${currentStatus} semester can't be directly updated to ${requestedStatus}!`,
    );
  }

  if (
    currentStatus === registrationStatus.ONGOING &&
    requestedStatus === registrationStatus.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `${currentStatus} semester can't be updated to ${requestedStatus}!`,
    );
  }

  if (
    currentStatus === registrationStatus.ONGOING &&
    requestedStatus === registrationStatus.ONGOING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This semester status is already ${currentStatus}!`,
    );
  }

  if (
    currentStatus === registrationStatus.UPCOMING &&
    requestedStatus === registrationStatus.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This semester status is already ${currentStatus}!`,
    );
  }

  next();
});

// Static method to check if a semester is already registered
semesterRegistrationSchema.statics.isExistingSemesterRegistration =
  async function (id: Schema.Types.ObjectId) {
    const semesterRegistrationExists = await this.findOne({
      academicSemester: id,
    });

    if (semesterRegistrationExists) {
      throw new AppError(
        httpStatus.CONFLICT,
        "This semester is already registered!",
      );
    }
  };

export const SemesterRegistration = model<
  ISemesterRegistration,
  SemesterRegistrationModel
>("SemesterRegistration", semesterRegistrationSchema);
