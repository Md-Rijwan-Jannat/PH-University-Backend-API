import { AcademicDepartmentValidation } from "./academicDepartment.validation";
import { AcademicDepartmentControllers } from "./academicDepartment.controller";
import { ValidationRequest as RequestValidation } from "../../middlewares/ValidationRequest";
import { Router } from "express";

const router = Router();

router.post(
  "/create-academic-department",
  RequestValidation(
    AcademicDepartmentValidation.createAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.createAcademicDepartment,
);

router.get("/", AcademicDepartmentControllers.getAllAcademicDepartment);

router.get(
  "/:departmentId",
  AcademicDepartmentControllers.getSingleAcademicDepartment,
);

router.patch(
  "/:departmentId",
  RequestValidation(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.updateSingleAcademicDepartment,
);

export const AcademicDepartmentRoutes = router;
