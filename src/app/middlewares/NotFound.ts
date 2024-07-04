/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

// route error handler
const notFoundErrorHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API Not Found!",
    error: "",
  });
};

export const NotFound = notFoundErrorHandler;
