import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

// route error handler
const notFoundErrorHandler = (req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    status: httpStatus.NOT_FOUND,
    message: "API not found",
    error: "",
  });
};

// global error handler
const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err.message || "Internal server error";

  return res.status(statusCode).json({
    success: false,
    message: message,
    error: {
      status: statusCode,
      stack: err.stack,
    },
  });
};

// Not found error handler
export class AppError extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string, stack = "") {
    super(message);
    this.statusCode = statusCode;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export const ErrorHandler = {
  notFoundErrorHandler,
  globalErrorHandler,
};
