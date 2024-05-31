import express from "express";
import { StudentControllers } from "./student.controllers";
import { Validation } from "../../middlewares/dataValidation";
import { studentValidations } from "./student.validation";

const router = express.Router();

router.get("/", StudentControllers.grtAllStudents);

router.get("/:studentId", StudentControllers.getSingleStudent);

router.patch(
  "/:studentId",
  Validation(studentValidations.updateStudentValidationSchema),
  StudentControllers.updateSingleStudent,
);

router.delete("/:studentId", StudentControllers.deleteStudent);

export const StudentRoutes = router;
