import httpStatus from "http-status";
import { SemesterDetails } from "./semester.constants";
import { ISemester } from "./semester.interface";
import { Semester } from "./semester.model";
import { AppError } from "../../middlewares/AppError";

// Semester create service
const createSemesterIntoDB = async (payload: ISemester) => {
  // Semester code validation
  if (SemesterDetails.semesterCodeData[payload.name] !== payload.code) {
    throw new AppError(httpStatus.NOT_FOUND, "Invalid semester code!");
  }

  const result = await Semester.create(payload);
  return result;
};

// All semester get service
const getAllSemesterFromDB = async () => {
  const result = await Semester.find();
  return result;
};

// Get single semester service
const getSingleSemesterFromDB = async (_id: string) => {
  const result = await Semester.findOne({ _id });
  return result;
};

// Update semester details
const updateSemesterDetailsFromDB = async (
  _id: string,
  payload: Partial<ISemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    SemesterDetails.semesterCodeData[payload.name] !== payload.code
  ) {
    throw new AppError(httpStatus.NOT_FOUND, "Invalid semester code!");
  }
  const result = await Semester.findOneAndUpdate(
    {
      _id,
    },
    payload,
    {
      new: true,
    },
  );
  return result;
};

export const SemesterServices = {
  createSemesterIntoDB,
  getAllSemesterFromDB,
  getSingleSemesterFromDB,
  updateSemesterDetailsFromDB,
};
