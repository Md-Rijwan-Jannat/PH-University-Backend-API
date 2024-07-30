import { AcademicFacultyValidation } from "./academicFaculty.validation";
import { AcademicFacultyControllers } from "./academicFaculty.controller";
import { ValidationRequest } from "../../middlewares/ValidationRequest";
import { Router } from "express";
import { Auth } from "../../middlewares/Auth";
import { USER_ROLE } from "../user/user.constants";

const router = Router();

router.post(
  "/create-academic-faculty",
  Auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  ValidationRequest(
    AcademicFacultyValidation.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.createAcademicFaculty,
);

router.get(
  "/",
  Auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  AcademicFacultyControllers.getAllAcademicFaculty,
);

router.get(
  "/:facultyId",
  Auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  AcademicFacultyControllers.getSingleAcademicFaculty,
);

router.patch(
  "/:facultyId",
  Auth(USER_ROLE.admin),
  ValidationRequest(
    AcademicFacultyValidation.updateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.updateSingleAcademicFaculty,
);

export const AcademicFacultyRoutes = router;
