import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import generateToken from "../util/generate-token";
import User from "./../models/User";

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors);
  }

  const { email, password } = req.body;

  try {
    const user: any = await User.findOne({ email });
    console.log("user", user);

    if (!user) {
      res.status(401).json({ msg: "User doesn't exist." });
    } else {
      // Check password
      const passwordMatches = await user.matchPasswords(
        password,
        user.password
      );
      if (passwordMatches) {
        // Generate token
        const token = generateToken(user._id);

        res.status(200).json({
          _id: user._id,
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin,
          token,
        });
      } else {
        return res.status(401).json({ msg: "Password is incorrect." });
      }
    }
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Something went wrong. Try again later." });
  }
};

export { loginUser };
