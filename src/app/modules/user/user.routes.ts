import { NextFunction, Request, Response, Router } from "express";
import { UserController } from "./user.controller";
import { studentValidations } from "../student/student.validation";
import { ValidationRequest } from "../../middlewares/ValidationRequest";
import { facultyValidations } from "../faculty/faculty.validation";
import { adminValidations } from "../admin/admin.validation";
import { USER_ROLE } from "./user.constants";
import { Auth } from "../../middlewares/Auth";
import { UserValidation } from "./user.validation";
import { upload } from "../../utils/sendImageToCloudinary";

const router = Router();

router.post(
  "/create-student",
  Auth(USER_ROLE.admin),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.body.data) {
        req.body = JSON.parse(req.body.data);
      }
      next();
    } catch (error) {
      return res.status(400).json({ message: "Invalid JSON data" });
    }
  },
  ValidationRequest(studentValidations.createStudentValidationSchema),
  UserController.createStudent,
);

router.post(
  "/create-faculty",
  Auth(USER_ROLE.admin),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.body.data) {
        req.body = JSON.parse(req.body.data);
      }
      next();
    } catch (error) {
      return res.status(400).json({ message: "Invalid JSON data" });
    }
  },
  ValidationRequest(facultyValidations.createFacultyValidationSchema),
  UserController.createFaculty,
);

router.post(
  "/create-admin",
  // Auth(USER_ROLE.admin),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.body.data) {
        req.body = JSON.parse(req.body.data);
      }
      next();
    } catch (error) {
      return res.status(400).json({ message: "Invalid JSON data" });
    }
  },
  ValidationRequest(adminValidations.createAdminValidationSchema),
  UserController.createAdmin,
);

router.get(
  "/me",
  Auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  UserController.getMe,
);

router.patch(
  "/user-status-change/:id",
  Auth(USER_ROLE.admin),
  ValidationRequest(UserValidation.userStatusChangeValidationSchema),
  UserController.userStatusChange,
);

export const UserRoutes = router;
