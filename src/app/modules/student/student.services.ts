import { IStudent } from "./student.interface";
import { Student } from "./student.model";

// Get All student service
const getAllStudentFromDB = async () => {
  const result = await Student.find();
  return result;
};

// Get single student service
const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

// update single student service
const updateSingleStudentFromDB = async (
  id: string,
  payload: Partial<IStudent>,
) => {
  const result = await Student.findOneAndUpdate(
    {
      id,
    },
    payload,
    {
      new: true,
    },
  );
  return result;
};
// delete student service
const deleteStudentFromDB = async (id: string) => {
  const result = await Student.findOneAndUpdate(
    { id },
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const StudentServices = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  updateSingleStudentFromDB,
  deleteStudentFromDB,
};
