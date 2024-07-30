import express from "express";
import { StudentControllers } from "./student.controllers";
import { ValidationRequest } from "../../middlewares/ValidationRequest";
import { studentValidations } from "./student.validation";
import { USER_ROLE } from "../user/user.constants";
import { Auth } from "../../middlewares/Auth";

const router = express.Router();

router.get(
  "/",
  Auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  StudentControllers.getAllStudents,
);

router.get(
  "/:studentId",
  Auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  StudentControllers.getSingleStudent,
);

router.patch(
  "/:studentId",
  Auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  ValidationRequest(studentValidations.updateStudentValidationSchema),
  StudentControllers.updateSingleStudent,
);

router.delete(
  "/:studentId",
  Auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  StudentControllers.deleteStudent,
);

export const StudentRoutes = router;
