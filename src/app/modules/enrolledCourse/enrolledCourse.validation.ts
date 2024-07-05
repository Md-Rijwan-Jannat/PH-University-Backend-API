import { z } from "zod";

const createEnrolledCourseSchema = z.object({
  body: z.object({
    student: z.string({
      invalid_type_error: "Student Id must be a String",
      required_error: "Student Id is required",
    }),
  }),
});

export const EnrolledCourseValidation = {
  createEnrolledCourseSchema,
};
