import { Request, Response } from "express";
import { validationResult } from "express-validator";
import User from "./../models/User";

const loginUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors);
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ msg: "User doesn't exist." });
    }

    
  } catch (error) {
    throw new Error("Something went wrong during login. Try again later!");
  }
};

export { loginUser };
