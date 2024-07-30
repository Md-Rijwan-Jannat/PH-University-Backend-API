import { AcademicDepartmentValidation } from "./academicDepartment.validation";
import { AcademicDepartmentControllers } from "./academicDepartment.controller";
import { ValidationRequest as RequestValidation } from "../../middlewares/ValidationRequest";
import { Router } from "express";
import { Auth } from "../../middlewares/Auth";
import { USER_ROLE } from "../user/user.constants";

const router = Router();

router.post(
  "/create-academic-department",
  Auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  RequestValidation(
    AcademicDepartmentValidation.createAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.createAcademicDepartment,
);

router.get(
  "/",
  Auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  AcademicDepartmentControllers.getAllAcademicDepartment,
);

router.get(
  "/:departmentId",
  Auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  AcademicDepartmentControllers.getSingleAcademicDepartment,
);

router.patch(
  "/:departmentId",
  Auth(USER_ROLE.admin),
  RequestValidation(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.updateSingleAcademicDepartment,
);

export const AcademicDepartmentRoutes = router;
