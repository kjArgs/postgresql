import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
export const ErrorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof ZodError) {
    return res.status(400).json({
      status: "validation_error",
      message: "Validation Error",
      error: error.issues,
    });
  }
};
