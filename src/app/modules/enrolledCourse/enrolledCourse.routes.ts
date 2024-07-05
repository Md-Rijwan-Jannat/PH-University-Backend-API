import express from "express";
import { EnrolledCourseValidation } from "./enrolledCourse.validation";
import { ValidationRequest } from "../../middlewares/ValidationRequest";
import { EnrolledCourseController } from "./enrolledCourse.controller";

const router = express.Router();

router.post(
  "/enrolled-course",
  ValidationRequest(EnrolledCourseValidation.createEnrolledCourseSchema),
  EnrolledCourseController.createEnrolledCourse,
);
