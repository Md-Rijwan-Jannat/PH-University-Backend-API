import { z } from "zod";

// Define the Zod validation schema for the name structure
const adminNameSchema = z.object({
  firstName: z
    .string({
      invalid_type_error: "This field must be a string",
      required_error: "This field are required",
    })
    .regex(/^[A-Z][a-z]*$/, "First name must start with an uppercase letter.")
    .max(10, "First name max length is 10 characters.")
    .trim()
    .describe("First name is required."),
  middleName: z
    .string({
      invalid_type_error: "This field must be a string",
      required_error: "This field are required",
    })
    .regex(/^[A-Z][a-z]*$/, "Middle name must start with an uppercase letter.")
    .max(10, "Middle name max length is 10 characters.")
    .trim()
    .optional(),
  lastName: z
    .string({
      invalid_type_error: "This field must be a string",
      required_error: "This field are required",
    })
    .regex(/^[A-Z][a-z]*$/, "Last name must start with an uppercase letter.")
    .max(10, "Last name max length is 10 characters.")
    .trim()
    .describe("Last name is required."),
});

// Define the main Zod validation schema for the admin
const createAdminValidationSchema = z.object({
  body: z.object({
    password: z
      .string({
        invalid_type_error: "This field must be a string",
        required_error: "This field are required",
      })
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
        "Password must contain at least one letter, one number, and one special character",
      )
      .trim()
      .describe("Password is required"),
    admin: z.object({
      name: adminNameSchema.describe("Admin name is required"),
      gender: z.enum(["male", "Female"]).describe("Gender is required"),
      religion: z
        .enum(["Islam", "Hindu", "Christian", "Buddhist", "Others"])
        .describe("Religion is required"),
      bloodGroup: z
        .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
        .optional(),
      email: z
        .string({
          invalid_type_error: "This field must be a string",
          required_error: "This field are required",
        })
        .email("Email must be a valid email")
        .trim()
        .describe("Email is required"),
      dateOfBirth: z
        .string({
          invalid_type_error: "This field must be a string",
          required_error: "This field are required",
        })
        .trim()
        .describe("Date of birth is required"),
      contactNo: z
        .string({
          invalid_type_error: "This field must be a string",
          required_error: "This field are required",
        })
        .trim()
        .describe("Contact number is required"),
      emergencyContactNo: z
        .string({
          invalid_type_error: "This field must be a string",
          required_error: "This field are required",
        })
        .trim()
        .describe("Emergency contact number is required"),
      presentAddress: z
        .string({
          invalid_type_error: "This field must be a string",
          required_error: "This field are required",
        })
        .trim()
        .describe("Current address is required"),
      permanentAddress: z
        .string({
          invalid_type_error: "This field must be a string",
          required_error: "This field are required",
        })
        .trim()
        .describe("Permanent address is required"),
      profileImage: z
        .string({
          invalid_type_error: "This field must be a string",
          required_error: "This field are required",
        })
        .trim()
        .describe("Admin avatar is required"),
    }),
  }),
});

const updateAdminValidationSchema = z.object({
  body: createAdminValidationSchema.partial(),
});

export const adminValidations = {
  createAdminValidationSchema,
  updateAdminValidationSchema,
};
