import QueryBuilder from "../../builder/QueryBuilder";
import { AcademicFacultySearchableFields } from "./academicFaculty.constants";
import { IAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";

// Create academic faculty service
const createAcademicFacultyIntoDB = async (payload: IAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

// Get all faculty service
const getAllAcademicFacultyFromDB = async (query: Record<string, unknown>) => {
  const academicFacultyQueryBuilder = new QueryBuilder(
    AcademicFaculty.find(),
    query,
  );

  const modifiedQuery = academicFacultyQueryBuilder
    .search(AcademicFacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await modifiedQuery.modelQuery;
  const meta = await academicFacultyQueryBuilder.countTotal();

  return {
    meta,
    result,
  };
};

// Get single academic faculty service
const getSingleAcademicFacultyFromDB = async (_id: string) => {
  const result = await AcademicFaculty.findOne({ _id });
  return result;
};

// Update single academic faculty
const updateSingleAcademicFacultyFromDB = async (
  _id: string,
  payload: IAcademicFaculty,
) => {
  const result = await AcademicFaculty.findOneAndUpdate(
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

export const AcademicFacultyServices = {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultyFromDB,
  getSingleAcademicFacultyFromDB,
  updateSingleAcademicFacultyFromDB,
};
