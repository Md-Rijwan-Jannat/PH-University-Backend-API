import express from "express";
import { ValidationRequest } from "../../middlewares/ValidationRequest";
import { facultyValidations } from "./faculty.validation";
import { FacultyControllers } from "./faculty.controller";
import { Auth } from "../../middlewares/Auth";
import { USER_ROLE } from "../user/user.constants";

const router = express.Router();

router.get(
  "/",
  Auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  FacultyControllers.grtAllFaculties,
);

router.get(
  "/:facultyId",
  Auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  FacultyControllers.getSingleFaculty,
);

router.patch(
  "/:facultyId",
  Auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  ValidationRequest(facultyValidations.updateFacultyValidationSchema),
  FacultyControllers.updateSingleFaculty,
);

router.delete(
  "/:facultyId",
  Auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  FacultyControllers.deleteFaculty,
);

export const FacultyRoutes = router;
