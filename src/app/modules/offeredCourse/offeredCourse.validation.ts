/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import mongoose from "mongoose";
import { Days } from "./offeredCourse.constants";

// Helper function to validate mongoose ObjectId
const isValidObjectId = (value: unknown): value is mongoose.Types.ObjectId => {
  return mongoose.Types.ObjectId.isValid(value as any);
};

const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/;

// Zod schema for IOfferedCourse
const createOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      offeredCourse: z.object({
        semesterRegistration: z.any().refine(isValidObjectId, {
          message: "Invalid type, semesterRegistration must be an ObjectId",
        }),
        academicFaculty: z.any().refine(isValidObjectId, {
          message: "Invalid type, academicFaculty must be an ObjectId",
        }),
        academicDepartment: z.any().refine(isValidObjectId, {
          message: "Invalid type, academicDepartment must be an ObjectId",
        }),
        course: z.any().refine(isValidObjectId, {
          message: "Invalid type, course must be an ObjectId",
        }),
        faculty: z.any().refine(isValidObjectId, {
          message: "Invalid type, faculty must be an ObjectId",
        }),
        maxCapacity: z.number({
          required_error: "Max capacity is required",
          invalid_type_error: "Invalid type, maxCapacity must be a number",
        }),
        session: z.number({
          required_error: "Session is required",
          invalid_type_error: "Invalid type, session must be a number",
        }),
        days: z.array(z.enum([...Days] as [string, ...string[]])),
        startTime: z
          .string({
            required_error: "Start time is required",
            invalid_type_error: "Invalid type, startTime must be a string",
          })
          .refine((time) => timeRegex.test(time), {
            message: "Invalid time format, expected 'HH':'MM' 24 hours format!",
          }),
        endTime: z
          .string({
            required_error: "End time is required",
            invalid_type_error: "Invalid type, endTime must be a string",
          })
          .refine((time) => timeRegex.test(time), {
            message: "Invalid time format, expected 'HH':'MM' 24 hours format!",
          }),
      }),
    })
    .refine(
      (body) => {
        const start = new Date(`1970-01-01T${body.offeredCourse.startTime}:00`);
        const end = new Date(`1970-01-01T${body.offeredCourse.endTime}:00`);
        return end > start;
      },
      { message: "Start time should be before End time!" },
    ),
});

const updateOfferedCourseValidationSchema = z.object({
  body: createOfferedCourseValidationSchema.partial(),
});

export const OfferedCourseValidation = {
  createOfferedCourseValidationSchema,
  updateOfferedCourseValidationSchema,
};
