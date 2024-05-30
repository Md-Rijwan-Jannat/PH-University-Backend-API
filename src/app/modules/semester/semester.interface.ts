export type TMonths =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

export type TSemesterName =
  | "Semester-1"
  | "Semester-2"
  | "Semester-3"
  | "Semester-4"
  | "Semester-5"
  | "Semester-6"
  | "Semester-7"
  | "Semester-8"
  | "Semester-9"
  | "Semester-10";

export type TSemesterCode =
  | "01"
  | "02"
  | "03"
  | "04"
  | "05"
  | "06"
  | "07"
  | "08";

// Semester code validation
export interface TSemesterCodeData {
  [key: string]: string;
}

export interface ISemester {
  name: TSemesterName;
  year: string;
  code: TSemesterCode;
  startMonth: TMonths;
  endMonth: TMonths;
  childDepartment: string;
  isDeleted: boolean;
}
