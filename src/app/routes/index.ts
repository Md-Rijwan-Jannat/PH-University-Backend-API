import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { StudentRoutes } from "../modules/student/student.routes";
import { FacultyRoutes } from "../modules/faculty/faculty.routes";
import { SemesterRoutes } from "../modules/semester/semester.routes";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.routes";
import { AcademicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.routes";
import { AdminRoutes } from "../modules/admin/admin.routes";

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
  {
    path: "/faculties",
    routeFile: FacultyRoutes,
  },
  {
    path: "/admins",
    routeFile: AdminRoutes,
  },
  {
    path: "/semesters",
    routeFile: SemesterRoutes,
  },
  {
    path: "/academic-faculties",
    routeFile: AcademicFacultyRoutes,
  },
  {
    path: "/academic-departments",
    routeFile: AcademicDepartmentRoutes,
  },
];

// all route loop is here
routerModel.forEach((route) => router.use(route.path, route.routeFile));

export default router;
