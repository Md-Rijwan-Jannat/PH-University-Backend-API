import { Router } from "express";
import { SemesterController } from "./semester.controller";
import { ValidationRequest } from "../../middlewares/ValidationRequest";
import { SemesterValidation } from "./semester.validation";

const router = Router();

router.post(
  "/create-semester",
  ValidationRequest(SemesterValidation.createSemesterValidationSchema),
  SemesterController.createSemester,
);

router.get("/", SemesterController.getAllSemester);

router.get("/:semesterId", SemesterController.getSingleSemester);

router.patch(
  "/:semesterId",
  ValidationRequest(SemesterValidation.updateSemesterValidationSchema),
  SemesterController.updateSingleSemester,
);

export const SemesterRoutes = router;
