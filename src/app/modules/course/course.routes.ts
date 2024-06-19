import express from "express";
import { CourseController } from "./course.controller";
import { ValidationRequest } from "../../middlewares/ValidationRequest";
import { CourseValidation } from "./course.validation";

const router = express.Router();

router.post(
  "/create-course",
  ValidationRequest(CourseValidation.courseCourseValidationSchema),
  CourseController.createCourse,
);

router.get("/", CourseController.getAllCourses);

router.get("/:id", CourseController.getSingleCourse);

router.patch(
  "/:id",
  ValidationRequest(CourseValidation.updateCourseValidationSchema),
  CourseController.updateSingleCourse,
);

router.put(
  "/:courseId/assign-faculties",
  ValidationRequest(CourseValidation.facultyWithCourseValidationSchema),
  CourseController.assignFacultiesWithCourse,
);

router.delete(
  "/:courseId/remove-faculties",
  ValidationRequest(CourseValidation.facultyWithCourseValidationSchema),
  CourseController.removeFacultiesWithCourse,
);

router.delete("/:id", CourseController.deleteSingleCourse);

export const CourseRoutes = router;
