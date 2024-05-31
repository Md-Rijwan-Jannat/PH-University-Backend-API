import { AcademicDepartmentValidation } from "./academicDepartment.validation";
import { AcademicDepartmentControllers } from "./academicDepartment.controller";
import { Validation } from "../../middlewares/dataValidation";
import { Router } from "express";

const router = Router();

router.post(
  "/create-academic-department",
  Validation(
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
  Validation(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.updateSingleAcademicDepartment,
);

export const AcademicDepartmentRoutes = router;