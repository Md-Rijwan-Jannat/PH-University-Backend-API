import express from "express";
import { SemesterRegistrationController } from "./semesterRegistration.controller";
import { SemesterRegistrationValidation } from "./semesterRegistration.validation";
import { ValidationRequest } from "../../middlewares/ValidationRequest";
import { Auth } from "../../middlewares/Auth";
import { USER_ROLE } from "../user/user.constants";

const router = express.Router();

router.post(
  "/create-semester-registration",
  Auth(USER_ROLE.admin, USER_ROLE.faculty),
  ValidationRequest(
    SemesterRegistrationValidation.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.createSemesterRegistration,
);

router.get(
  "/",
  Auth(USER_ROLE.admin, USER_ROLE.faculty),
  SemesterRegistrationController.getAllSemesterRegistration,
);

router.get(
  "/:id",
  Auth(USER_ROLE.admin, USER_ROLE.faculty),
  SemesterRegistrationController.getSingleSemesterRegistration,
);

router.patch(
  "/:id",
  Auth(USER_ROLE.admin),
  ValidationRequest(
    SemesterRegistrationValidation.updateSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.updateSingleSemesterRegistration,
);

router.delete(
  "/:id",
  Auth(USER_ROLE.admin),
  SemesterRegistrationController.deleteSingleSemesterRegistration,
);

export const SemesterRegistrationRoutes = router;
