import { Student } from "./student.model";

// Get All student
const getAllStudentFromDB = async () => {
  const result = await Student.find();
  return result;
};

// Get single student
const getSingleStudentFromDB = async (_id: string) => {
  // const result = await Student.findOne({ _id });
  const result = await Student.aggregate([
    {
      $match: { id: _id },
    },
  ]);
  return result;
};

// delete student
const deleteStudentFromDB = async (_id: string) => {
  const result = await Student.findOneAndUpdate(
    { _id },
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const StudentServices = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
