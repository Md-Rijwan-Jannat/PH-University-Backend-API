import express from "express";
import { SemesterRegistrationController } from "./semesterRegistration.controller";
import { SemesterRegistrationValidation } from "./semesterRegistration.validation";
import { ValidationRequest } from "../../middlewares/ValidationRequest";

const router = express.Router();

router.post(
  "/create-semester-registration",
  ValidationRequest(
    SemesterRegistrationValidation.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.createSemesterRegistration,
);

router.get("/", SemesterRegistrationController.getAllSemesterRegistration);

router.get(
  "/:id",
  SemesterRegistrationController.getSingleSemesterRegistration,
);

router.patch(
  "/:id",
  ValidationRequest(
    SemesterRegistrationValidation.updateSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.updateSingleSemesterRegistration,
);

router.delete(
  "/:id",
  SemesterRegistrationController.deleteSingleSemesterRegistration,
);

export const SemesterRegistrationRoutes = router;
