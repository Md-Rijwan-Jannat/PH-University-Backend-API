import { z } from "zod";

const userValidationSchema = z
  .string({ invalid_type_error: "Password must be string" })
  .min(8)
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
  );

const authValidationSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: "This ID is required",
      invalid_type_error: "This ID must be a string",
    }),
    password: userValidationSchema,
  }),
});

const changeValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: "Previous password is required",
      invalid_type_error: "Previous password must be a string",
    }),
    newPassword: userValidationSchema,
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: "Refresh token is required",
      invalid_type_error: "Refresh token must be a string",
    }),
  }),
});

const forgetPasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: "User id is required",
    }),
  }),
});

export const AuthValidation = {
  authValidationSchema,
  changeValidationSchema,
  refreshTokenValidationSchema,
  forgetPasswordValidationSchema,
};
