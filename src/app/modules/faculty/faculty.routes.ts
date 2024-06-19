import express from "express";
import { ValidationRequest } from "../../middlewares/ValidationRequest";
import { facultyValidations } from "./faculty.validation";
import { FacultyControllers } from "./faculty.controller";
import { Auth } from "../../middlewares/Auth";

const router = express.Router();

router.get("/", Auth(), FacultyControllers.grtAllFaculties);

router.get("/:facultyId", FacultyControllers.getSingleFaculty);

router.patch(
  "/:facultyId",
  ValidationRequest(facultyValidations.updateFacultyValidationSchema),
  FacultyControllers.updateSingleFaculty,
);

router.delete("/:facultyId", FacultyControllers.deleteFaculty);

export const FacultyRoutes = router;
