import { z } from "zod";
import {
  TMonths,
  TSemesterCode,
  TSemesterExam,
  TSemesterName,
} from "./semester.interface";
import {
  months,
  semesterCode,
  semesterExam,
  semesterName,
  mainDepartments,
  childDepartments,
} from "./semester.model";

export const createSemesterValidationSchema = z.object({
  body: z.object({
    name: z
      .enum(semesterName as [TSemesterName, ...TSemesterName[]])
      .describe("Name field is required"),
    year: z.date().describe("Date field is required"),
    code: z
      .enum(semesterCode as [TSemesterCode, ...TSemesterCode[]])
      .describe("Code field is required"),
    startMonth: z
      .enum(months as [TMonths, ...TMonths[]])
      .describe("Start Month field is required"),
    endMonth: z
      .enum(months as [TMonths, ...TMonths[]])
      .describe("End Month field is required"),
    exam: z
      .enum(semesterExam as [TSemesterExam, ...TSemesterExam[]])
      .describe("Exam field is required"),
    department: z
      .enum(mainDepartments.map(String) as [string, ...string[]])
      .describe("Department field is required"),
    childDepartment: z
      .enum(childDepartments.map(String) as [string, ...string[]])
      .describe("Child Department field is required"),
  }),
});
