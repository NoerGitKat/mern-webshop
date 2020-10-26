import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import { Document } from "mongoose";
import { IDecodedJWT } from "../types/user-types";

const checkAuth = async (
  req: { headers: { authorization: any }; user: Document | null },
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (authorization) {
    const token = authorization.split(" ")[1];
    try {
      const isAuthorized = jwt.verify(
        token,
        <string>process.env.JWT_SECRET
      ) as IDecodedJWT;

      if (isAuthorized) {
        // Add user to request
        req.user = await User.findById(isAuthorized.id).select("-password");

        next();
      } else {
        return res.status(401).json({ msg: "Please login again." });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  } else {
    return res.status(401).json({ msg: "You must login first." });
  }
};

export default checkAuth;
