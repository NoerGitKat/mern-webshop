import { NextFunction, Request, Response } from "express";

const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.isAdmin) {
    next();
  } else {
    return res
      .status(401)
      .json([{ msg: "You should have administrator rights to access." }]);
  }
};

export default checkAdmin;
