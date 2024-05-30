import { SemesterDetails } from "./semester.constants";
import { ISemester } from "./semester.interface";
import { Semester } from "./semester.model";

// Semester create service
const createSemesterIntoDB = async (payload: ISemester) => {
  // Semester code validation
  if (SemesterDetails.semesterCodeData[payload.name] !== payload.code) {
    throw new Error("Invalid semester code!");
  }

  const result = await Semester.create(payload);
  return result;
};

// All semester get service
const getAllSemesterFromDB = async () => {
  const result = await Semester.find();

  if (!result || result.length === 0) {
    throw new Error("Semesters not found!");
  }

  return result;
};

// Get single semester service
const getSingleSemesterFromDB = async (_id: string) => {
  const result = await Semester.findOne({ _id });

  if (!result) {
    throw new Error("Semester not found!");
  }

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
    throw new Error("Invalid semester code!");
  }
  const result = await Semester.findOneAndUpdate({ _id }, payload, {
    new: true,
  });

  if (!result) {
    throw new Error("Semester can't found!");
  }

  return result;
};

export const SemesterServices = {
  createSemesterIntoDB,
  getAllSemesterFromDB,
  getSingleSemesterFromDB,
  updateSemesterDetailsFromDB,
};
