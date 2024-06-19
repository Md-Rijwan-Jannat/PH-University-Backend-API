import { z } from "zod";
import { semesterRegistrationStatus } from "./semesterRegistration.constants";

const createSemesterRegistrationValidationSchema = z.object({
  body: z.object({
    semesterRegistration: z.object({
      academicSemester: z.string({
        required_error: "Academic semester id is required",
        invalid_type_error: "Academic semester id must be a string",
      }),
      status: z
        .enum([...(semesterRegistrationStatus as [string, ...string[]])], {
          required_error: "Semester status id is required",
          invalid_type_error: "Semester status must be a string",
        })
        .optional()
        .default("UPCOMING"),
      startDate: z
        .string({
          required_error: "Semester start date is required",
          invalid_type_error: "Semester start date must be a string",
        })
        .datetime(),
      endDate: z
        .string({
          required_error: "Semester end date is required",
          invalid_type_error: "Semester end date must be a string",
        })
        .datetime(),
      minCredits: z
        .number({
          required_error: "Minimum credits is required",
          invalid_type_error: "Minimum credits must be a number",
        })
        .optional()
        .default(3),
      maxCredits: z
        .number({
          required_error: "Max credits is required",
          invalid_type_error: "Max credits must be a number",
        })
        .optional()
        .default(15),
    }),
  }),
});

const updateSemesterRegistrationValidationSchema = z.object({
  body: createSemesterRegistrationValidationSchema.partial(),
});

export const SemesterRegistrationValidation = {
  createSemesterRegistrationValidationSchema,
  updateSemesterRegistrationValidationSchema,
};
