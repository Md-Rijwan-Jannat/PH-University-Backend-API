import { IEnrolledCourse } from "./enrolledCourse.interface";
import { EnrolledCourse } from "./enrolledCourse.model";

const createEnrolledCourseIntoDB = async (payload: IEnrolledCourse) => {
  const result = await EnrolledCourse.create(payload);
  return result;
};

export const EnrolledCourseServices = {
  createEnrolledCourseIntoDB,
};
