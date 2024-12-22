import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import ts from "typescript";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log();

  const header = req.headers.authorization;
  const decoded = jwt.verify(header as string, JWT_SECRET);
  if (decoded) {
    //@ts-ignore
    req.userId = decoded.id;
    next();
  } else {
    res.status(401).json({ message: "You are not logged in" });
  }
};
