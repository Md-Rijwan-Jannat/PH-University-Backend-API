import express from "express";
import { OfferedCourseController } from "./offeredCourse.controller";
import { ValidationRequest } from "../../middlewares/ValidationRequest";
import { OfferedCourseValidation } from "./offeredCourse.validation";
import { USER_ROLE } from "../user/user.constants";
import { Auth } from "../../middlewares/Auth";

const router = express.Router();

router.post(
  "/create-offered-course",
  Auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  ValidationRequest(
    OfferedCourseValidation.createOfferedCourseValidationSchema,
  ),
  OfferedCourseController.createOfferedCourse,
);

router.get(
  "/",
  Auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  OfferedCourseController.getAllOfferedCourse,
);

router.get(
  "/my-offered-courses",
  Auth(USER_ROLE.student),
  OfferedCourseController.getMyOfferedCourse,
);

router.get(
  "/:id",
  Auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  OfferedCourseController.getSingleOfferedCourse,
);

router.patch(
  "/:id",
  Auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  ValidationRequest(
    OfferedCourseValidation.updateOfferedCourseValidationSchema,
  ),
  OfferedCourseController.updateSingleOfferedCourse,
);

router.delete(
  "/:id",
  Auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  OfferedCourseController.deleteSingleOfferedCourse,
);

export const OfferedCourseRoutes = router;
