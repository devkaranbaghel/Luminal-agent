import { Request, Response, NextFunction } from "express";

export class ApiError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  // Log error for debugging
  console.error(`[Error] ${req.method} ${req.url}:`, err);

  res.status(statusCode).json({
    success: false,
    data: null,
    error: message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
