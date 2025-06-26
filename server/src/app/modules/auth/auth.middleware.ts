import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../../../config";
import { Types } from "mongoose";

// export interface JwtPayload {
//   userId: string;
//   role: string;
// }
export interface JwtPayload {
  _id: string;
  email: string;
  role: "customer" | "admin" | "store-manager";
};


// jwt verify
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  console.log("jwt middleware inside", token);
  if (!token) {
    res.status(401).json({ message: "Unauthorized: No token" });
    return;
  }
  try {
    const decoded = jwt.verify(token, config.jwt_secret!) as JwtPayload;
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

// role check
export const authorize =
  (...roles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    console.log(roles);
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ message: "Forbidden: Insufficient permissions" });
      return;
    }
    next();
  };
