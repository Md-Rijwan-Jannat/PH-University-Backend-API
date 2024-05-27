import {
  TChildDepartment,
  TMainDepartment,
} from "../modules/semester/semester.interface";

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

const MainDepartmentIds = [
  ,
  "ME",
  "EE",
  "CE",
  "CS",
  "ECE",
  "AE",
  "IT",
  "CHE",
  "BME",
  "EnvE",
  "IE",
];

export enum TDepartmentId {
  ME = "ME",
  EE = "EE",
  CE = "CE",
  CS = "CS",
  ECE = "ECE",
  AE = "AE",
  IT = "IT",
  CHE = "CHE",
  BME = "BME",
  EnvE = "EnvE",
  IE = "IE",
}

const SemesterCodes = ["01", "02", "03", "04", "05", "06", "07", "08"] as const;

const SemesterExams = ["Meet Tram Exam", "Semester Final Exam"] as const;

const DepartmentMapping: Record<TMainDepartment, TChildDepartment[]> = {
  "Mechanical Engineering": [
    {
      mainDepartment: "Mechanical Engineering",
      id: TDepartmentId.ME,
      name: "Mechanical Engineering",
    },
    {
      mainDepartment: "Mechanical Engineering",
      id: TDepartmentId.ME,
      name: "Thermodynamics",
    },
    {
      mainDepartment: "Mechanical Engineering",
      id: TDepartmentId.ME,
      name: "Fluid Mechanics",
    },
  ],
  "Electrical Engineering": [
    {
      mainDepartment: "Electrical Engineering",
      id: TDepartmentId.EE,
      name: "Electrical Engineering",
    },
    {
      mainDepartment: "Electrical Engineering",
      id: TDepartmentId.EE,
      name: "Embedded Systems",
    },
    {
      mainDepartment: "Electrical Engineering",
      id: TDepartmentId.EE,
      name: "VLSI Design",
    },
  ],
  "Civil Engineering": [
    {
      mainDepartment: "Civil Engineering",
      id: TDepartmentId.CE,
      name: "Civil Engineering",
    },
    {
      mainDepartment: "Civil Engineering",
      id: TDepartmentId.CE,
      name: "Structural Analysis",
    },
    {
      mainDepartment: "Civil Engineering",
      id: TDepartmentId.CE,
      name: "Construction Engineering",
    },
  ],
  "Computer Science": [
    {
      mainDepartment: "Computer Science",
      id: TDepartmentId.CS,
      name: "Computer Science",
    },
    {
      mainDepartment: "Computer Science",
      id: TDepartmentId.CS,
      name: "Network Engineering",
    },
    {
      mainDepartment: "Computer Science",
      id: TDepartmentId.CS,
      name: "Software Engineering",
    },
    {
      mainDepartment: "Computer Science",
      id: TDepartmentId.CS,
      name: "Machine Learning",
    },
  ],
  "Electronics and Communication": [
    {
      mainDepartment: "Electronics and Communication",
      id: TDepartmentId.ECE,
      name: "Electronics and Communication",
    },
    {
      mainDepartment: "Electronics and Communication",
      id: TDepartmentId.ECE,
      name: "Embedded Systems",
    },
    {
      mainDepartment: "Electronics and Communication",
      id: TDepartmentId.ECE,
      name: "VLSI Design",
    },
  ],
  "Automobile Engineering": [
    {
      mainDepartment: "Automobile Engineering",
      id: TDepartmentId.AE,
      name: "Automobile Engineering",
    },
    {
      mainDepartment: "Automobile Engineering",
      id: TDepartmentId.AE,
      name: "Automotive Design",
    },
    {
      mainDepartment: "Automobile Engineering",
      id: TDepartmentId.AE,
      name: "Robotics",
    },
  ],
  "Information Technology": [
    {
      mainDepartment: "Information Technology",
      id: TDepartmentId.IT,
      name: "Information Technology",
    },
    {
      mainDepartment: "Information Technology",
      id: TDepartmentId.IT,
      name: "Software Engineering",
    },
    {
      mainDepartment: "Information Technology",
      id: TDepartmentId.IT,
      name: "Network Engineering",
    },
  ],
  "Chemical Engineering": [
    {
      mainDepartment: "Chemical Engineering",
      id: TDepartmentId.CHE,
      name: "Chemical Engineering",
    },
    {
      mainDepartment: "Chemical Engineering",
      id: TDepartmentId.CHE,
      name: "Biomaterials",
    },
    {
      mainDepartment: "Chemical Engineering",
      id: TDepartmentId.CHE,
      name: "Bioprocess Engineering",
    },
  ],
  "Biomedical Engineering": [
    {
      mainDepartment: "Biomedical Engineering",
      id: TDepartmentId.BME,
      name: "Biomedical Engineering",
    },
    {
      mainDepartment: "Biomedical Engineering",
      id: TDepartmentId.BME,
      name: "Biomaterials",
    },
    {
      mainDepartment: "Biomedical Engineering",
      id: TDepartmentId.BME,
      name: "Bioprocess Engineering",
    },
  ],
  "Environmental Engineering": [
    {
      mainDepartment: "Environmental Engineering",
      id: TDepartmentId.EnvE,
      name: "Environmental Engineering",
    },
    {
      mainDepartment: "Environmental Engineering",
      id: TDepartmentId.EnvE,
      name: "Waste Management",
    },
    {
      mainDepartment: "Environmental Engineering",
      id: TDepartmentId.EnvE,
      name: "Renewable Energy",
    },
  ],
  "Industrial Engineering": [
    {
      mainDepartment: "Industrial Engineering",
      id: TDepartmentId.IE,
      name: "Industrial Engineering",
    },
    {
      mainDepartment: "Industrial Engineering",
      id: TDepartmentId.IE,
      name: "Operations Research",
    },
    {
      mainDepartment: "Industrial Engineering",
      id: TDepartmentId.IE,
      name: "Quality Control",
    },
  ],
};

export const DepartmentDetails = {
  Months,
  SemesterNames,
  SemesterCodes,
  SemesterExams,
  MainDepartments,
  MainDepartmentIds,
  DepartmentMapping,
};
