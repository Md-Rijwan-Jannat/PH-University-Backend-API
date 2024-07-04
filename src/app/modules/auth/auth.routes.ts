import express from "express";
import { AuthController } from "./auth.controller";
import { ValidationRequest } from "../../middlewares/ValidationRequest";
import { AuthValidation } from "./auth.validation";
import { Auth } from "../../middlewares/Auth";
import { USER_ROLE } from "../user/user.constants";

const router = express.Router();

router.post(
  "/login",
  ValidationRequest(AuthValidation.authValidationSchema),
  AuthController.authLogin,
);

router.post(
  "/change-password",
  Auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  ValidationRequest(AuthValidation.changeValidationSchema),
  AuthController.changePassword,
);

router.post(
  "/refresh-token",
  ValidationRequest(AuthValidation.refreshTokenValidationSchema),
  AuthController.refreshToken,
);

router.post(
  "/forget-password",
  ValidationRequest(AuthValidation.forgetPasswordValidationSchema),
  AuthController.forgetPassword,
);

router.post(
  "/reset-password",
  Auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  ValidationRequest(AuthValidation.resetPasswordValidationSchema),
  AuthController.resetPassword,
);

export const AuthRoutes = router;
