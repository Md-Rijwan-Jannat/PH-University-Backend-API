import { z } from "zod";

const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    academicDepartment: z.object({
      name: z.string({
        invalid_type_error: "Academic department name must be a string",
        required_error: "Academic department is required",
      }),
      academicFaculty: z.string({
        required_error: "Academic faculty id ia required",
      }),
    }),
  }),
});

const updateAcademicDepartmentValidationSchema = z.object({
  body: createAcademicDepartmentValidationSchema.partial(),
});

export const AcademicDepartmentValidation = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};
