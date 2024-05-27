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

export type TSemesterExam = "Meet Tram Exam" | "Semester Final Exam";

export type TMainDepartment =
  | "Mechanical Engineering"
  | "Electrical Engineering"
  | "Civil Engineering"
  | "Computer Science"
  | "Electronics and Communication"
  | "Automobile Engineering"
  | "Information Technology"
  | "Chemical Engineering"
  | "Biomedical Engineering"
  | "Environmental Engineering"
  | "Industrial Engineering";

export type TChildDepartment = {
  mainDepartment: TMainDepartment;
  id: string;
  name: string;
};

export interface ISemester {
  name: TSemesterName;
  year: Date;
  code: TSemesterCode;
  startMonth: TMonths;
  endMonth: TMonths;
  exam: TSemesterExam;
  department: TMainDepartment;
  childDepartment: string;
  isDeleted: boolean;
}
