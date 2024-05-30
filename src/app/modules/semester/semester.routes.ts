import { Router } from "express";
import { SemesterController } from "./semester.controller";
import { Validation } from "../../middlewares/dataValidation";
import { SemesterValidation } from "./semester.validation";

const router = Router();

router.post(
  "/create-semester",
  Validation(SemesterValidation.createSemesterValidationSchema),
  SemesterController.createSemester,
);

router.get("/", SemesterController.getAllSemester);

router.get("/:semesterId", SemesterController.getSingleSemester);

router.patch(
  "/:semesterId",
  Validation(SemesterValidation.updateSemesterValidationSchema),
  SemesterController.updateSingleSemester,
);

export const SemesterRoutes = router;
