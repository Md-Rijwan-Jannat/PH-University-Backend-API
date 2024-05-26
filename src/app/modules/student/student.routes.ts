import express from "express";
import { StudentControllers } from "./student.controllers";

const router = express.Router();

router.get("/", StudentControllers.grtAllStudents);

router.get("/single-student", StudentControllers.getSingleStudent);

router.delete("/single-student", StudentControllers.deleteStudent);

export const StudentRoutes = router;
