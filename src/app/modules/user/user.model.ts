import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";
import config from "../../config";
import bcrypt from "bcrypt";

export const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
    },
    needsChangePassword: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ["admin", "student", "faculty"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["in-progress", "blocked"],
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
    throw new Error("This user is already exists!");
  }

  next();
});

// Post-save hook
userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

export const User = model<IUser>("User", userSchema);
