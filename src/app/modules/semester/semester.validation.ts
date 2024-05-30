import { z } from "zod";
import { months, semesterCode, semesterName } from "./semester.model";

const createSemesterValidationSchema = z.object({
  body: z.object({
    semester: z.object({
      name: z
        .enum([...semesterName] as [string, ...string[]])
        .describe("Name field is required"),
      year: z.string().describe("Date field is required"),
      code: z
        .enum([...semesterCode] as [string, ...string[]])
        .describe("Code field is required"),
      startMonth: z
        .enum([...months] as [string, ...string[]])
        .describe("Start Month field is required"),
      endMonth: z
        .enum([...months] as [string, ...string[]])
        .describe("End Month field is required"),
    }),
  }),
});

const updateSemesterValidationSchema = z.object({
  body: createSemesterValidationSchema.partial(),
});

export const SemesterValidation = {
  createSemesterValidationSchema,
  updateSemesterValidationSchema,
};
