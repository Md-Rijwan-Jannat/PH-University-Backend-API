import { ISemester } from "../semester/semester.interface";
import { User } from "./user.model";

const findLastStudent = async () => {
  const lastStudent = await User.findOne(
    {
      role: "student",
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastStudent?.id ? lastStudent.id : undefined;
};

export const generateSemesterId = async (payload: ISemester) => {
  let currentId = (0).toString();

  const lastStudent = await findLastStudent();
  const lastSemesterCode = lastStudent?.substring(4, 6);
  const lastSemesterYear = lastStudent?.substring(0, 4);
  const currentSemesterCode = payload.code;
  const currentSemesterYear = payload.year;

  if (
    lastStudent &&
    lastSemesterCode === currentSemesterCode &&
    lastSemesterYear === currentSemesterYear
  ) {
    currentId = lastStudent.substring(6);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
  console.log(incrementId);
  incrementId = `${payload.year}${payload.code}${incrementId}`;

  console.log(await findLastStudent());

  return incrementId;
};
