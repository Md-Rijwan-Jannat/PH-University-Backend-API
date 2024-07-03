import { Router } from "express";
import { SemesterController } from "./semester.controller";
import { ValidationRequest } from "../../middlewares/ValidationRequest";
import { SemesterValidation } from "./semester.validation";
import { Auth } from "../../middlewares/Auth";
import { USER_ROLE } from "../user/user.constants";

const router = Router();

router.post(
  "/create-semester",
  Auth(USER_ROLE.admin),
  ValidationRequest(SemesterValidation.createSemesterValidationSchema),
  SemesterController.createSemester,
);

router.get(
  "/",
  Auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  SemesterController.getAllSemester,
);

router.get(
  "/:semesterId",
  Auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  SemesterController.getSingleSemester,
);

router.patch(
  "/:semesterId",
  Auth(USER_ROLE.admin),
  ValidationRequest(SemesterValidation.updateSemesterValidationSchema),
  SemesterController.updateSingleSemester,
);

export const SemesterRoutes = router;
