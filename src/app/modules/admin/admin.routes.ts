import express from "express";
import { ValidationRequest } from "../../middlewares/ValidationRequest";
import { adminValidations } from "./admin.validation";
import { AdminControllers } from "./admin.controller";
import { USER_ROLE } from "../user/user.constants";
import { Auth } from "../../middlewares/Auth";

const router = express.Router();

router.get(
  "/",
  Auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  AdminControllers.grtAllFaculties,
);

router.get(
  "/:adminId",
  Auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  AdminControllers.getSingleAdmin,
);

router.patch(
  "/:adminId",
  Auth(USER_ROLE.admin),
  ValidationRequest(adminValidations.updateAdminValidationSchema),
  AdminControllers.updateSingleAdmin,
);

router.delete("/:adminId", Auth(USER_ROLE.admin), AdminControllers.deleteAdmin);

export const AdminRoutes = router;
