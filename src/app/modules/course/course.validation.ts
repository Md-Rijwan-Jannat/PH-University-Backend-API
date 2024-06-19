import { z } from "zod";

// Zod schema for IPreRequisitesCourses
const preRequisitesCoursesValidationSchema = z.object({
  course: z.string({ invalid_type_error: "Course ID must be a string" }),
  isDeleted: z
    .boolean({ invalid_type_error: "isDeleted must be a boolean" })
    .optional()
    .default(false),
});

// Zod schema for create ICourse
const courseCourseValidationSchema = z.object({
  body: z.object({
    course: z.object({
      title: z.string({ invalid_type_error: "Title must be a string" }).trim(),
      prefix: z
        .string({ invalid_type_error: "Prefix must be a string" })
        .trim(),
      code: z
        .number({ invalid_type_error: "Code must be a number" })
        .int()
        .nonnegative("Course code must be a non-negative integer"),
      credits: z
        .number({ invalid_type_error: "Credits must be a number" })
        .positive("Course credits must be a positive number")
        .int(),
      preRequisitesCourses: z
        .array(preRequisitesCoursesValidationSchema)
        .optional(),
      isDeleted: z
        .boolean({ invalid_type_error: "isDeleted must be a boolean" })
        .optional()
        .default(false),
    }),
  }),
});

// Zod schema for update ICourse
const updateCourseValidationSchema = z.object({
  body: courseCourseValidationSchema.partial(),
});

const assignFacultyWithCourseValidationSchema = z.object({
  body: z.object({
    faculties: z.array(
      z.string({ invalid_type_error: "Faculty ID must be a string" }),
    ),
    isDeleted: z
      .boolean({ invalid_type_error: "isDeleted must be a boolean" })
      .optional()
      .default(false),
  }),
});
export const CourseValidation = {
  courseCourseValidationSchema,
  updateCourseValidationSchema,
  facultyWithCourseValidationSchema: assignFacultyWithCourseValidationSchema,
};
