import { z } from "zod";

const createAcademicFacultyValidationSchema = z.object({
  body: z.object({
    academicFaculty: z.object({
      name: z.string().describe("Academic faculty name must be a string"),
    }),
  }),
});

const updateAcademicFacultyValidationSchema = z.object({
  body: createAcademicFacultyValidationSchema.partial(),
});

export const AcademicFacultyValidation = {
  createAcademicFacultyValidationSchema,
  updateAcademicFacultyValidationSchema,
};
