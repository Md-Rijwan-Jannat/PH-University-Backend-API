import express from "express";
import { Validation } from "../../middlewares/dataValidation";
import { adminValidations } from "./admin.validation";
import { AdminControllers } from "./admin.controller";

const router = express.Router();

router.get("/", AdminControllers.grtAllFaculties);

router.get("/:adminId", AdminControllers.getSingleAdmin);

router.patch(
  "/:adminId",
  Validation(adminValidations.updateAdminValidationSchema),
  AdminControllers.updateSingleAdmin,
);

router.delete("/:adminId", AdminControllers.deleteAdmin);

export const AdminRoutes = router;
