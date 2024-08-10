import httpStatus from "http-status";
import {
  SemesterDetails,
  SemesterSearchableFields,
} from "./semester.constants";
import { ISemester } from "./semester.interface";
import { Semester } from "./semester.model";
import { AppError } from "../../middlewares/AppError";
import QueryBuilder from "../../builder/QueryBuilder";

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
const getAllSemesterFromDB = async (query: Record<string, unknown>) => {
  const academicSemesterQueryBuilder = new QueryBuilder(Semester.find(), query)
    .search(SemesterSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await academicSemesterQueryBuilder.modelQuery;
  const meta = await academicSemesterQueryBuilder.countTotal();

  return {
    meta,
    result,
  };
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
