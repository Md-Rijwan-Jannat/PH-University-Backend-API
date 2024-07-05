/* eslint-disable @typescript-eslint/no-explicit-any */
import { Schema, model } from "mongoose";
import { IUser, UserModel } from "./user.interface";
import config from "../../config";
import bcrypt from "bcrypt";
import { AppError } from "../../middlewares/AppError";
import httpStatus from "http-status";
import { userStatus } from "./user.constants";

export const userSchema = new Schema<IUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      select: 0,
    },
    needsChangePassword: {
      type: Boolean,
      default: true,
    },
    passwordCreatedAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: ["admin", "student", "faculty"],
      trim: true,
    },
    status: {
      type: String,
      enum: userStatus,
      default: "in-progress",
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Pre-save hook for password hashing
userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      const password = this.password;
      const saltRounds = Number(config.password_salt_rounds);
      this.password = await bcrypt.hash(password, saltRounds);
    }
    next();
  } catch (error: any) {
    next(error);
  }
});

userSchema.pre("save", async function (next) {
  const isExistsUser = await User.findOne({
    name: this.id,
  });

  if (isExistsUser) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is already exists!");
  }

  next();
});

// Post-save hook
userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

// is user is existing!
userSchema.statics.isUserExistingByCustomId = async function (id: string) {
  return await User.findOne({ id }).select("+password");
};

// is user is deleted!
userSchema.statics.isUserDeleted = async function (id: string) {
  const user = await User.findOne({ id }).select("isDeleted");
  return user ? user.isDeleted : false;
};

//  is user is blocked!
userSchema.statics.isUserBlocked = async function (id: string) {
  const user = await User.findOne({ id }).select("status");
  return user ? user.status === "blocked" : false;
};

// is user password match!
userSchema.statics.isPasswordMatch = async function (
  resentLoginPassword: string,
  hashPassword: string,
) {
  return await bcrypt.compare(resentLoginPassword, hashPassword);
};

// is jwt token not valid after change password
userSchema.statics.isJwtIssuedBeforePasswordChange = async function (
  passwordCreateTimestamp: number,
  jwtIssuedTimestamp: number,
) {
  console.log(passwordCreateTimestamp, jwtIssuedTimestamp);

  return passwordCreateTimestamp > jwtIssuedTimestamp;
};

export const User = model<IUser, UserModel>("User", userSchema);
