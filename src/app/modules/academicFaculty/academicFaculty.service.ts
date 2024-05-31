import { IAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";

// Create academic faculty service
const createAcademicFacultyIntoDB = async (payload: IAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

// Get all faculty service
const getAllAcademicFacultyFromDB = async () => {
  const result = await AcademicFaculty.find();
  return result;
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
