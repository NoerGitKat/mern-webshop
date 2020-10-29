import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import generateToken from "../util/generate-token";
import hashPassword from "../util/hash-password";
import User from "./../models/User";

// @desc Log user in
// @route POST /api/users/login
// @access  Public
const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors);
  }

  const { email, password } = req.body;

  try {
    const user: any = await User.findOne({ email });

    if (!user) {
      return res.status(401).json([{ msg: "User doesn't exist." }]);
    } else {
      // Check password
      const passwordMatches = await user.matchPasswords(
        password,
        user.password
      );
      if (passwordMatches) {
        // Generate token
        const token = generateToken(user._id);

        return res.status(200).json({
          _id: user._id,
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin,
          token,
        });
      } else {
        return res.status(401).json([{ msg: "Password is incorrect." }]);
      }
    }
  } catch (error) {
    return res
      .status(500)
      .json([{ msg: "Something went wrong. Try again later." }]);
  }
};

// @desc Log user in
// @route POST /api/users/login
// @access  Public
const getUserProfile = async (
  req: { user: { id: string } },
  res: Response,
  next: NextFunction
) => {
  try {
    const user: any = await User.findById(req.user.id);

    if (user) {
      return res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      return res.status(404).json([{ msg: "User not found." }]);
    }
  } catch (error) {
    return res
      .status(500)
      .json([{ msg: "Something went wrong. Try again later." }]);
  }
};

// @desc Create a new user
// @route POST /api/users/register
// @access Public
const createUser = async (req: Request, res: Response) => {
  // Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors);
  }

  const { username, password, email } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json([{ msg: "User already exists with that email." }]);
    } else {
      const hashedPassword = await hashPassword(password);

      const newUser = {
        username,
        email,
        password: hashedPassword,
        isAdmin: false,
      };

      const createdUser: any = await User.create(newUser);

      if (createdUser) {
        const token = generateToken(createdUser._id);

        return res.status(201).json({
          _id: createdUser._id,
          username: createdUser.username,
          email: createdUser.email,
          isAdmin: createdUser.isAdmin,
          token,
        });
      } else {
        return res.status(400).json([
          {
            msg: "Something went wrong during registration. Try again later.",
          },
        ]);
      }
    }
  } catch (error) {
    console.log("Error happened!", error.message);
    return res
      .status(500)
      .json([{ msg: "Something went wrong. Try again later." }]);
  }
};

export { loginUser, getUserProfile, createUser };
