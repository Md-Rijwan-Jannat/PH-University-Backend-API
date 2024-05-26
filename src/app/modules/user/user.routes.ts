import { Router } from "express";
import { UserController } from "./user.controller";
import { studentValidations } from "../student/student.validation";
import { Validation } from "../../middlewares/dataValidation";

const router = Router();

router.post(
  "/create-student",
  Validation(studentValidations.createStudentValidationSchema),
  UserController.createStudent,
);

export const UserRoutes = router;
