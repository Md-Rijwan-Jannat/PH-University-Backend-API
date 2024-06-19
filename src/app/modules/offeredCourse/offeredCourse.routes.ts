import express from "express";
import { OfferedCourseController } from "./offeredCourse.controller";
import { ValidationRequest } from "../../middlewares/ValidationRequest";
import { OfferedCourseValidation } from "./offeredCourse.validation";

const router = express.Router();

router.post(
  "/create-offered-course",
  ValidationRequest(
    OfferedCourseValidation.createOfferedCourseValidationSchema,
  ),
  OfferedCourseController.createOfferedCourse,
);

router.get("/", OfferedCourseController.getAllOfferedCourse);

router.get("/:id", OfferedCourseController.getSingleOfferedCourse);

router.patch(
  "/:id",
  ValidationRequest(
    OfferedCourseValidation.updateOfferedCourseValidationSchema,
  ),
  OfferedCourseController.updateSingleOfferedCourse,
);

router.delete("/:id", OfferedCourseController.deleteSingleOfferedCourse);

export const OfferedCourseRoutes = router;
