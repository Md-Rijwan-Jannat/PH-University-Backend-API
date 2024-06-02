import mongoose from "mongoose";
import { TErrorSources } from "../interface/error";

const handleCastError = (err: mongoose.Error.CastError) => {
  const errorSources: TErrorSources = [
    {
      path: err?.path,
      message: err?.message,
    },
  ];
  const statusCode = 404;

  return {
    statusCode,
    message: "Invalid _id",
    errorSources,
  };
};

export const HandleCastError = handleCastError;
