import httpStatus from "http-status";
import { AppError } from "../../middlewares/AppError";
import { User } from "../user/user.model";
import { IAuthLogin } from "./auth.interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import bcrypt from "bcrypt";
import { createJwtToken } from "./auth.utils";
import { sEndEmail } from "../../utils/sendEmail";

const authLogin = async (payload: IAuthLogin) => {
  const user = await User.isUserExistingByCustomId(payload.id);

  console.log(user);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found!");
  }

  if (await User.isUserDeleted(user.id)) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is deleted!");
  }

  if (await User.isUserBlocked(user.id)) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is blocked!");
  }

  if (!(await User.isPasswordMatch(payload.password, user.password))) {
    throw new AppError(httpStatus.CONFLICT, "Incorrect password!");
  }

  // create jwt token
  const jwtPayload = { userId: user.id, role: user.role };

  const accessToken = createJwtToken(
    jwtPayload,
    config.jwt_access_token as string,
    config.jwt_access_expire_in as string,
  );
  const refreshToken = createJwtToken(
    jwtPayload,
    config.jwt_refresh_token as string,
    config.jwt_refresh_expire_in as string,
  );

  return {
    accessToken,
    refreshToken,
    needsChangePassword: user.needsChangePassword,
  };
};

const changePasswordIntoDB = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  const user = await User.isUserExistingByCustomId(userData.userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found!");
  }

  if (await User.isUserDeleted(user.id)) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is deleted!");
  }

  if (await User.isUserBlocked(user.id)) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is blocked!");
  }

  if (!(await User.isPasswordMatch(payload.oldPassword, user.password))) {
    throw new AppError(httpStatus.CONFLICT, "Incorrect password!");
  }

  const newPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.password_salt_rounds),
  );
  const result = await User.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: newPassword,
      needsChangePassword: false,
      passwordCreatedAt: new Date(),
    },
    {
      new: true,
    },
  );
  console.log(result, payload);
  return result;
};

const refreshToken = async (token: string) => {
  console.log(token);
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_token as string,
  ) as JwtPayload;

  const { userId, iat } = decoded;
  const user = await User.findOne({ id: userId });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found!");
  }

  if (await User.isUserDeleted(user.id)) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is deleted!");
  }

  if (await User.isUserBlocked(user.id)) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is blocked!");
  }

  const changePasswordTimestamp =
    new Date(user.passwordCreatedAt as Date).getTime() / 1000;

  if (
    await User.isJwtIssuedBeforePasswordChange(
      changePasswordTimestamp,
      iat as number,
    )
  ) {
    throw new AppError(httpStatus.FORBIDDEN, "This user not authorized!!");
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = createJwtToken(
    jwtPayload,
    config.jwt_access_token as string,
    config.jwt_access_expire_in as string,
  );

  return { accessToken };
};

const forgetPasswordIntoDB = async (userId: string) => {
  const user = await User.findOne({ id: userId });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found!");
  }

  if (await User.isUserDeleted(user.id)) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is deleted!");
  }

  if (await User.isUserBlocked(user.id)) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is blocked!");
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const resetToken = createJwtToken(
    jwtPayload,
    config.jwt_access_token as string,
    "10m",
  );

  const resetLink = `${config.reset_link_url}?id=${user.id}&token=${resetToken}`;

  sEndEmail(user.email, resetLink);
  console.log(resetLink);
};

const resetPasswordIntoDB = async (
  payload: { id: string; newPassword: string },
  token: string,
) => {
  const user = await User.findOne({ id: payload.id });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found!");
  }

  if (await User.isUserDeleted(user.id)) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is deleted!");
  }

  if (await User.isUserBlocked(user.id)) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is blocked!");
  }

  // check if token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_access_token as string,
  ) as JwtPayload;

  if (payload.id !== decoded.userId) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is forbidden!");
  }

  const newHashPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.password_salt_rounds),
  );

  const result = await User.findOneAndUpdate(
    {
      id: decoded.userId,
      role: decoded.role,
    },
    {
      password: newHashPassword,
      needsChangePassword: false,
      passwordCreatedAt: new Date(),
    },
    { new: true },
  );

  return result;
};

export const AuthService = {
  authLogin,
  changePasswordIntoDB,
  refreshToken,
  forgetPasswordIntoDB,
  resetPasswordIntoDB,
};
