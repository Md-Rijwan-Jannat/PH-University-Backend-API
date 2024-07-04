/* eslint-disable no-unused-expressions */
import { ErrorRequestHandler } from "express";
import { AppError } from "./AppError";
import { TErrorSources } from "../interface/error";
import { ZodError } from "zod";
import config from "../config";
import { HandleZodError } from "../error/handleZodError";
import { HandleMongooseError } from "../error/handleMongooseError";
import { HandleCastError } from "../error/handleCastError";
import { HandleDuplicateFiledError } from "../error/handleDuplicateIdFiled";

// global error handler
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err);

  if (res.headersSent) {
    return next(err);
  }

  let statusCode = 500;
  let message = "Internal server error";

  let errorSources: TErrorSources = [
    {
      path: 400,
      message: "Something went wrong",
    },
  ];

  if (err instanceof ZodError) {
    const simpliFiedError = HandleZodError(err);
    (statusCode = simpliFiedError.statusCode),
      (message = simpliFiedError.message),
      (errorSources = simpliFiedError.errorSources);
  } else if (err?.name === "ValidationError") {
    const simplifiedError = HandleMongooseError(err);
    (statusCode = simplifiedError.statusCode),
      (message = simplifiedError.message),
      (errorSources = simplifiedError.errorSources);
  } else if (err?.name === "CastError") {
    const simplifiedError = HandleCastError(err);
    (statusCode = simplifiedError.statusCode),
      (message = simplifiedError.message),
      (errorSources = simplifiedError.errorSources);
  } else if (err?.errorResponse?.code === 11000) {
    const simplifiedError = HandleDuplicateFiledError(err);
    (statusCode = simplifiedError.statusCode),
      (message = simplifiedError.message),
      (errorSources = simplifiedError.errorSources);
  } else if (err instanceof AppError) {
    (statusCode = err?.statusCode),
      (message = err?.message),
      (errorSources = [
        {
          path: "",
          message: err?.message,
        },
      ]);
  } else if (err instanceof Error) {
    (message = err?.message),
      (errorSources = [
        {
          path: "",
          message: err?.message,
        },
      ]);
  }

  return res.status(statusCode).json({
    status: statusCode,
    success: false,
    message: message,
    errorSources,
    stack: config.node_env === "development" ? err.stack : null,
  });
};

export const GlobalError = globalErrorHandler;
