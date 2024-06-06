import { Router } from "express";
import { UserController } from "./user.controller";
import { studentValidations } from "../student/student.validation";
import { Validation } from "../../middlewares/dataValidation";
import { facultyValidations } from "../faculty/faculty.validation";
import { adminValidations } from "../admin/admin.validation";

const router = Router();

router.post(
  "/create-student",
  Validation(studentValidations.createStudentValidationSchema),
  UserController.createStudent,
);

router.post(
  "/create-faulty",
  Validation(facultyValidations.createFacultyValidationSchema),
  UserController.createFaculty,
);
router.post(
  "/create-admin",
  Validation(adminValidations.createAdminValidationSchema),
  UserController.createAdmin,
);

export const UserRoutes = router;
