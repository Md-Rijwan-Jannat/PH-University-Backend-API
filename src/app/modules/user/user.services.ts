import httpStatus from "http-status";
import config from "../../config";
import { Semester } from "../semester/semester.model";
import { IStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import { generateSemesterId } from "./user.utils";
import { AppError } from "../../middlewares/errorHandler";

const createStudentIntoDB = async (password: string, payload: IStudent) => {
  const userData: Partial<IUser> = {};

  // if the haven't password then set the default password
  userData.password = password || (config.default_password as string);

  // student role set
  userData.role = "student";

  const semesterData = await Semester.findById(payload.admissionSemester);

  if (!semesterData) {
    throw new AppError(httpStatus.NOT_FOUND, "Semester is invalid!");
  }

  // student id set
  userData.id = await generateSemesterId(semesterData);

  // Ensure the name field is an object
  if (
    typeof payload.name !== "object" ||
    !payload.name.firstName ||
    !payload.name.lastName
  ) {
    throw new AppError(httpStatus.NOT_FOUND, "Invalid student name data!");
  }

  // create the user
  const newUser = await User.create(userData);

  // create the student
  if (Object.keys(newUser).length) {
    payload.id = newUser.id;
    payload.user = newUser._id;

    const newStudent = await Student.create(payload);
    return newStudent;
  }

  return newUser;
};

export const UserServices = {
  createStudentIntoDB,
};
