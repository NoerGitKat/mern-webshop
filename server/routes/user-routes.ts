import { Router } from "express";
import {
  loginUser,
  getUserProfile,
  createUser,
  updateUserProfile,
} from "../controllers/users-controllers";
import checkAuth from "../middlewares/check-auth";
import {
  validateLogin,
  validateRegister,
  validateUpdateProfile,
} from "../middlewares/validation";

const usersRouter: Router = Router();

usersRouter.route("/login").post(validateLogin, loginUser);
usersRouter
  .route("/profile")
  .get(checkAuth as any, getUserProfile as any)
  .put(validateUpdateProfile, checkAuth as any, updateUserProfile);
usersRouter.route("/register").post(validateRegister, createUser);

export default usersRouter;
