import { Router } from "express";
import { UserController } from "./user.controller";
import { studentValidations } from "../student/student.validation";
import { ValidationRequest } from "../../middlewares/ValidationRequest";
import { facultyValidations } from "../faculty/faculty.validation";
import { adminValidations } from "../admin/admin.validation";

const router = Router();

router.post(
  "/create-student",
  // Auth(USER_ROLE.admin),
  ValidationRequest(studentValidations.createStudentValidationSchema),
  UserController.createStudent,
);

router.post(
  "/create-faculty",
  ValidationRequest(facultyValidations.createFacultyValidationSchema),
  UserController.createFaculty,
);

router.post(
  "/create-admin",
  ValidationRequest(adminValidations.createAdminValidationSchema),
  UserController.createAdmin,
);

export const UserRoutes = router;
