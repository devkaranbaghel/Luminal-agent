import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { ApiError } from "./error";

export interface AuthRequest extends Request {
  user?: { id: string };
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new ApiError(401, "Authentication required"));
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, config.jwt.accessSecret) as { sub: string };
    req.user = { id: payload.sub };
    next();
  } catch (error) {
    next(new ApiError(401, "Invalid or expired access token"));
  }
};
