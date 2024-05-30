import { IAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";

// Create academic faculty service
const createAcademicFacultyIntoDB = async (payload: IAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);

  if (!result) {
    throw new Error("Failed to cerate academic faculty!");
  }

  return result;
};

// Get all faculty service
const getAllAcademicFacultyFromDB = async () => {
  const result = await AcademicFaculty.find();

  if (!result) {
    throw new Error("Failed to retrieved academic faculties!");
  }
  return result;
};

// Get single academic faculty service
const getSingleAcademicFacultyFromDB = async (_id: string) => {
  const result = await AcademicFaculty.findOne({ _id });
  if (!result) {
    throw new Error("Failed to retrieved academic faculty!");
  }
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
  if (!result) {
    throw new Error("Failed to update academic faculty!");
  }
  return result;
};

export const AcademicFacultyServices = {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultyFromDB,
  getSingleAcademicFacultyFromDB,
  updateSingleAcademicFacultyFromDB,
};
