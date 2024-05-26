import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { StudentRoutes } from "../modules/student/student.routes";

const router = Router();

const routerModel = [
  {
    path: "/users",
    routeFile: UserRoutes,
  },
  {
    path: "/students",
    routeFile: StudentRoutes,
  },
];

// all route loop is here
routerModel.forEach((route) => router.use(route.path, route.routeFile));

export default router;
