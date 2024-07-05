import { z } from "zod";

// Define the Zod validation schema for the name structure
const studentNameSchema = z.object({
  firstName: z
    .string()
    .regex(/^[A-Z][a-z]*$/, "First name must start with an uppercase letter.")
    .max(10, "First name max length is 10 characters.")
    .trim()
    .describe("First name is required."),
  middleName: z
    .string()
    .regex(/^[A-Z][a-z]*$/, "Middle name must start with an uppercase letter.")
    .max(10, "Middle name max length is 10 characters.")
    .trim()
    .optional(),
  lastName: z
    .string()
    .regex(/^[A-Z][a-z]*$/, "Last name must start with an uppercase letter.")
    .max(10, "Last name max length is 10 characters.")
    .trim()
    .describe("Last name is required."),
});

// Define the Zod validation schema for the guardian structure
const guardianValidationSchema = z.object({
  fatherName: z.string().trim().describe("Father's name is required"),
  fatherContactNo: z
    .string()
    .trim()
    .describe("Father's contact number is required"),
  fatherOccupation: z
    .string()
    .trim()
    .describe("Father's occupation is required"),
  motherName: z.string().trim().describe("Mother's name is required"),
  motherContactNo: z
    .string()
    .trim()
    .describe("Mother's contact number is required"),
  motherOccupation: z
    .string()
    .trim()
    .describe("Mother's occupation is required"),
});

// Define the Zod validation schema for the local guardian structure
const localGuardianValidationSchema = z.object({
  name: z.string().trim().describe("Local guardian's name is required"),
  contactNo: z
    .string()
    .trim()
    .describe("Local guardian's contact number is required"),
  address: z.string().trim().describe("Local guardian's address is required"),
  email: z
    .string()
    .email("Local guardian's email must be a valid email")
    .trim()
    .describe("Local guardian's email is required"),
});

// Define the main Zod validation schema for the student
const createStudentValidationSchema = z.object({
  body: z.object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
        "Password must contain at least one letter, one number, and one special character",
      )
      .trim()
      .describe("Password is required")
      .optional(),
    student: z.object({
      name: studentNameSchema.describe("Student name is required"),
      gender: z.enum(["male", "female"]).describe("Gender is required"),
      religion: z
        .enum(["Islam", "Hindu", "Christian", "Buddhist", "Others"])
        .describe("Religion is required"),
      bloodGroup: z
        .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
        .optional(),
      email: z
        .string()
        .email("Email must be a valid email")
        .trim()
        .describe("Email is required"),
      dateOfBirth: z.string().trim().describe("Date of birth is required"),
      contactNo: z.string().trim().describe("Contact number is required"),
      emergencyContactNo: z
        .string()
        .trim()
        .describe("Emergency contact number is required"),
      presentAddress: z.string().trim().describe("Current address is required"),
      permanentAddress: z
        .string()
        .trim()
        .describe("Permanent address is required"),
      localGuardian: localGuardianValidationSchema.describe(
        "Local guardian is required",
      ),
      guardian: guardianValidationSchema.describe("Guardian is required"),
      profileImage: z.string().trim().describe("Student avatar is required"),
    }),
  }),
});

const updateStudentValidationSchema = z.object({
  body: createStudentValidationSchema.partial(),
});

export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
