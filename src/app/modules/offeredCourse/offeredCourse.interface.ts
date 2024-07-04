import { Types } from "mongoose";

// export interface Days {
//   day:
//     | "sunday"
//     | "monday"
//     | "tuesday"
//     | "wednesday"
//     | "thursday"
//     | "friday"
//     | "saturday";
//   isWeekend: boolean;
// }

export type TDays = "Sat" | "Sun" | "Mon" | "Tue" | "Thu" | "Wed" | "Fri";

export interface IOfferedCourse {
  semesterRegistration: Types.ObjectId;
  academicSemester?: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  course: Types.ObjectId;
  faculty: Types.ObjectId;
  maxCapacity: number;
  session: number;
  days: TDays[];
  startTime: string;
  endTime: string;
}

export interface TSchedule {
  days: TDays[];
  startTime: string;
  endTime: string;
}
