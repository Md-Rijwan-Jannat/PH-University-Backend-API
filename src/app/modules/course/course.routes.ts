import express from "express";
import { CourseController } from "./course.controller";
import { ValidationRequest } from "../../middlewares/ValidationRequest";
import { CourseValidation } from "./course.validation";
import { Auth } from "../../middlewares/Auth";
import { USER_ROLE } from "../user/user.constants";

const router = express.Router();

router.post(
  "/create-course",
  Auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  ValidationRequest(CourseValidation.courseCourseValidationSchema),
  CourseController.createCourse,
);

router.get(
  "/",
  Auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  CourseController.getAllCourses,
);

router.get(
  "/:id",
  Auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  CourseController.getSingleCourse,
);

router.patch(
  "/:id",
  Auth(USER_ROLE.admin),
  ValidationRequest(CourseValidation.updateCourseValidationSchema),
  CourseController.updateSingleCourse,
);

router.put(
  "/:courseId/assign-faculties",
  Auth(USER_ROLE.admin),
  ValidationRequest(CourseValidation.facultyWithCourseValidationSchema),
  CourseController.assignFacultiesWithCourse,
);

router.delete(
  "/:courseId/remove-faculties",
  Auth(USER_ROLE.admin),
  ValidationRequest(CourseValidation.facultyWithCourseValidationSchema),
  CourseController.removeFacultiesWithCourse,
);

router.delete(
  "/:id",
  Auth(USER_ROLE.admin),
  CourseController.deleteSingleCourse,
);

export const CourseRoutes = router;
