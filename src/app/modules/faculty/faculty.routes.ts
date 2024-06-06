import express from "express";
import { Validation } from "../../middlewares/dataValidation";
import { facultyValidations } from "./faculty.validation";
import { FacultyControllers } from "./faculty.controller";

const router = express.Router();

router.get("/", FacultyControllers.grtAllFaculties);

router.get("/:facultyId", FacultyControllers.getSingleFaculty);

router.patch(
  "/:facultyId",
  Validation(facultyValidations.updateFacultyValidationSchema),
  FacultyControllers.updateSingleFaculty,
);

router.delete("/:facultyId", FacultyControllers.deleteFaculty);

export const FacultyRoutes = router;
