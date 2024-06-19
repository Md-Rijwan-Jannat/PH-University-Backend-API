import express from "express";
import { StudentControllers } from "./student.controllers";
import { ValidationRequest } from "../../middlewares/ValidationRequest";
import { studentValidations } from "./student.validation";

const router = express.Router();

router.get("/", StudentControllers.getAllStudents);

router.get("/:studentId", StudentControllers.getSingleStudent);

router.patch(
  "/:studentId",
  ValidationRequest(studentValidations.updateStudentValidationSchema),
  StudentControllers.updateSingleStudent,
);

router.delete("/:studentId", StudentControllers.deleteStudent);

export const StudentRoutes = router;
