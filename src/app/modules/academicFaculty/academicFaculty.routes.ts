import { AcademicFacultyValidation } from "./academicFaculty.validation";
import { AcademicFacultyControllers } from "./academicFaculty.controller";
import { ValidationRequest } from "../../middlewares/ValidationRequest";
import { Router } from "express";

const router = Router();

router.post(
  "/create-academic-faculty",
  ValidationRequest(
    AcademicFacultyValidation.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.createAcademicFaculty,
);

router.get("/", AcademicFacultyControllers.getAllAcademicFaculty);

router.get("/:facultyId", AcademicFacultyControllers.getSingleAcademicFaculty);

router.patch(
  "/:facultyId",
  ValidationRequest(
    AcademicFacultyValidation.updateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.updateSingleAcademicFaculty,
);

export const AcademicFacultyRoutes = router;
