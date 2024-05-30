import { TSemesterCodeData } from "./semester.interface";

const Months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

const SemesterNames = [
  "Semester-1",
  "Semester-2",
  "Semester-3",
  "Semester-4",
  "Semester-5",
  "Semester-6",
  "Semester-7",
  "Semester-8",
  "Semester-9",
  "Semester-10",
] as const;

const MainDepartments = [
  "Mechanical Engineering",
  "Electrical Engineering",
  "Civil Engineering",
  "Computer Science",
  "Electronics and Communication",
  "Automobile Engineering",
  "Information Technology",
  "Chemical Engineering",
  "Biomedical Engineering",
  "Environmental Engineering",
  "Industrial Engineering",
] as const;

const SemesterCodes = ["01", "02", "03", "04", "05", "06", "07", "08"] as const;

// Semester code validation constants

const semesterCodeData: TSemesterCodeData = {
  "Semester-1": "01",
  "Semester-2": "02",
  "Semester-3": "03",
  "Semester-4": "04",
  "Semester-5": "05",
  "Semester-6": "06",
  "Semester-7": "07",
  "Semester-8": "08",
};

export const SemesterDetails = {
  Months,
  SemesterNames,
  SemesterCodes,
  MainDepartments,
  semesterCodeData,
};
