import { Request, Response } from "express";
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

export const RouteError = notFoundErrorHandler;
