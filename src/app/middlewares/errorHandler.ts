import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

// not found error handler
const notFoundErrorHandler = (req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    status: "Route error!",
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
  console.error("Global error handler:", err); // Log the error
  if (res.headersSent) {
    return next(err);
  }
  res.status(err.status || 500).json({
    success: false,
    status: "Global error!",
    message: "Internal server error",
    err,
  });
};

export const ErrorHandler = {
  notFoundErrorHandler,
  globalErrorHandler,
};
