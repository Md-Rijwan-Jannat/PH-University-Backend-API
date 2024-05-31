import { NextFunction, Request, Response } from "express";
import { Model, Document } from "mongoose";
import { AnyZodObject } from "zod";

const dataValidation = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
      });
      next();
    } catch (error) {
      next(error);
    }
  };
};

export async function preValidationCheck(
  model: Model<Document>,
  query: any,
  errorMessage: string,
  next: (error?: any) => void,
) {
  try {
    const existingDoc = await model.findOne(query);
    if (existingDoc) {
      throw new AppError(httpStatus.NOT_FOUND, errorMessage);
    }
    next();
  } catch (error) {
    next(error);
  }
}

export const Validation = dataValidation;
