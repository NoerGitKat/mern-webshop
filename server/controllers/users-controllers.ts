import { resolveSoa } from "dns";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { IUser } from "../types/user-types";
import generateToken from "../util/generate-token";
import hashPassword from "../util/hash-password";
import User from "./../models/User";

// @desc Get all users
// @route GET /api/users
// @access  Private (admin)
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    if (users) {
      return res.status(200).json(users);
    } else {
      return res.status(404).json([{ msg: "No users found." }]);
    }
  } catch (error) {
    return res.status(500).json([{ msg: error.message }]);
  }
};

// @desc Log user in
// @route POST /api/users/login
// @access  Public
const loginUser = async (req: Request, res: Response) => {
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

// @desc Get user profile
// @route GET /api/users/profile
// @access  Private
const getUserProfile = async (req: Request, res: Response) => {
  try {
    const user: any = await User.findById(req.user?.id);

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

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors);
  }

  try {
    const foundUser: any = await User.findById(req.user?.id);

    if (foundUser) {
      // Update or keep the old value
      foundUser.username = req.body.username || foundUser.username;
      foundUser.email = req.body.email || foundUser.email;
      if (req.body.password) {
        const hashedPassword = await hashPassword(req.body.password);
        foundUser.password = hashedPassword;
      }

      const updatedUser = await foundUser.save();

      return res.status(200).json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      return res
        .status(404)
        .json([{ msg: "There's no user with this profile!" }]);
    }
  } catch (error) {
    return res
      .status(500)
      .json([{ msg: "Something went wrong with updating. Try again later." }]);
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

// @desc Delete user
// @route DELETE /api/users/:id
// @access  Private (admin)
const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const foundUser = await User.findById(id);

    if (foundUser) {
      foundUser.remove();
      return res.status(200).json([{ msg: "User successfully removed." }]);
    } else {
      return res.status(404).json([{ msg: "User doesn't exist." }]);
    }
  } catch (error) {
    return res.status(500).json([{ msg: error.message }]);
  }
};

// @desc Get user by id
// @route GET /api/users/:id
// @access Private (admin)
const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const foundUser = await User.findById(id).select("-password");
    if (foundUser) {
      return res.status(200).json(foundUser);
    } else {
      return res.status(404).json([{ msg: "User not found." }]);
    }
  } catch (error) {
    return res.status(500).json([{ msg: error.msg }]);
  }
};

// @desc Update user by id
// @route PUT /api/users/:id
// @access Private (admin)
const updateUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, email, isAdmin } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors);
  }

  try {
    const foundUser: any = await User.findById(id).select("-password");

    if (foundUser) {
      foundUser.username = username || foundUser.username;
      foundUser.email = email || foundUser.email;
      foundUser.isAdmin = isAdmin;

      const updatedUser = await foundUser.save();

      return res.status(200).json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      return res.status(404).json([{ msg: "Couldn't find user." }]);
    }
  } catch (error) {
    return res.status(500).json([{ msg: error.msg }]);
  }
};

export {
  loginUser,
  getUserProfile,
  createUser,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  getUserById,
  updateUserById,
};
