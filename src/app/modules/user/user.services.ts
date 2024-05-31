import config from "../../config";
import { Semester } from "../semester/semester.model";
import { IStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import { generateSemesterId } from "./user.utils";

const createStudentIntoDB = async (password: string, payload: IStudent) => {
  const userData: Partial<IUser> = {};

  // if the have'nt password then set the default password
  userData.password = password || (config.default_password as string);

  // student role set
  userData.role = "student";

  const semesterData = await Semester.findById(payload.admissionSemester);

  if (!semesterData) {
    throw new Error("Semester is invalid!");
  }

  // student id set
  userData.id = await generateSemesterId(semesterData);

  // create the user
  const newUser = await User.create(userData);

  // create the student
  if (Object.keys(newUser).length) {
    payload.id = newUser.id;
    payload.user = newUser._id;

    if (payload) {
      const newStudent = await Student.create(payload);
      return newStudent;
    } else {
      throw new Error("Student creation filed");
    }
  }

  return newUser;
};

export const UserServices = {
  createStudentIntoDB,
};
