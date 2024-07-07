import express from "express";
import { EnrolledCourseValidation } from "./enrolledCourse.validation";
import { ValidationRequest } from "../../middlewares/ValidationRequest";
import { EnrolledCourseController } from "./enrolledCourse.controller";
import { Auth } from "../../middlewares/Auth";
import { USER_ROLE } from "../user/user.constants";

const router = express.Router();

router.post(
  "/create-enrolled-course",
  Auth(USER_ROLE.student),
  ValidationRequest(EnrolledCourseValidation.createEnrolledCourseSchema),
  EnrolledCourseController.createEnrolledCourse,
);

router.patch(
  "/update-enrolled-course-mark",
  Auth(USER_ROLE.faculty),
  ValidationRequest(EnrolledCourseValidation.updateEnrolledCourseMarkSchema),
  EnrolledCourseController.updateEnrolledCourseMark,
);

export const EnrolledCourseRoutes = router;
