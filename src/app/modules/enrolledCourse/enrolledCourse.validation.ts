import { z } from "zod";

const createEnrolledCourseSchema = z.object({
  body: z.object({
    offeredCourse: z.string({
      invalid_type_error: "Offered course Id must be a String",
      required_error: "Offered course Id is required",
    }),
  }),
});

const updateEnrolledCourseMarkSchema = z.object({
  body: z.object({
    semesterRegistration: z.string({
      required_error: "Semester Registration ID is required",
      invalid_type_error: "Semester registration is bust be a string",
    }),
    offeredCourse: z.string({
      required_error: "Semester Registration ID is required",
      invalid_type_error: "Semester registration is bust be a string",
    }),
    student: z.string({
      required_error: "Semester Registration ID is required",
      invalid_type_error: "Semester registration is bust be a string",
    }),
    courseMarks: z.object({
      classTest1: z
        .number({ invalid_type_error: "Mark must be a number" })
        .optional(),
      midTerm: z
        .number({ invalid_type_error: "Mark must be a number" })
        .optional(),
      classTest2: z
        .number({ invalid_type_error: "Mark must be a number" })
        .optional(),
      finalTerm: z
        .number({ invalid_type_error: "Mark must be a number" })
        .optional(),
    }),
  }),
});

export const EnrolledCourseValidation = {
  createEnrolledCourseSchema,
  updateEnrolledCourseMarkSchema,
};
