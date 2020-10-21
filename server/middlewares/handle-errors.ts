import { NextFunction, Request, Response } from "express";

const handleNotFound = (
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  const error = new Error(`URL not found - ${req.originalUrl}`);
  return res.status(404).json({ msg: error.message });
  // next();
};

const handleError = (err: Error, _req: Request, res: Response): Response => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  const errMessage = {
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  };

  return res.status(statusCode).json(errMessage);
};

export { handleNotFound, handleError };
