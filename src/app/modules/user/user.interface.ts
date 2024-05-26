export interface IUser {
  id: string;
  password: string;
  needsChangePassword: boolean;
  role: "admin" | "student" | "faculty";
  status: "in-progress" | "blocked";
  isDeleted: boolean;
}
