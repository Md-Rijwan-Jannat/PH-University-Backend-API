import express from "express";
import { ValidationRequest } from "../../middlewares/ValidationRequest";
import { adminValidations } from "./admin.validation";
import { AdminControllers } from "./admin.controller";

const router = express.Router();

router.get("/", AdminControllers.grtAllFaculties);

router.get("/:adminId", AdminControllers.getSingleAdmin);

router.patch(
  "/:adminId",
  ValidationRequest(adminValidations.updateAdminValidationSchema),
  AdminControllers.updateSingleAdmin,
);

router.delete("/:adminId", AdminControllers.deleteAdmin);

export const AdminRoutes = router;
