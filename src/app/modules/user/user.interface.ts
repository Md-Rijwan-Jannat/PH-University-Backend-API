import { Model } from "mongoose";
import { USER_ROLE } from "./user.constants";

export interface IUser {
  id: string;
  email: string;
  password: string;
  needsChangePassword: boolean;
  passwordCreatedAt?: Date;
  role: "superAdmin" | "admin" | "student" | "faculty";
  status: "in-progress" | "blocked";
  isDeleted: boolean;
}

export interface UserModel extends Model<IUser> {
  isUserExistingByCustomId(id: string): Promise<IUser | null>;
  isPasswordMatch(
    resentLoginPassword: string,
    hasPassword: string,
  ): Promise<boolean>;
  isUserBlocked(id: string): Promise<boolean>;
  isUserDeleted(id: string): Promise<boolean>;
  isJwtIssuedBeforePasswordChange(
    passwordCreateTimestamp: number,
    jwtIssuedTimestamp: number,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
