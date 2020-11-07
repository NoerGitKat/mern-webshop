import { Router } from "express";
import {
  loginUser,
  getUserProfile,
  createUser,
  updateUserProfile,
  getAllUsers,
  deleteUser,
} from "../controllers/users-controllers";
import checkAdmin from "../middlewares/check-admin";
import checkAuth from "../middlewares/check-auth";
import {
  validateLogin,
  validateRegister,
  validateUpdateProfile,
} from "../middlewares/validation";

const usersRouter: Router = Router();

usersRouter.route("/").get(checkAuth as any, checkAdmin, getAllUsers);
usersRouter.route("/login").post(validateLogin, loginUser);
usersRouter
  .route("/profile")
  .get(checkAuth as any, getUserProfile as any)
  .put(validateUpdateProfile, checkAuth as any, updateUserProfile);
usersRouter.route("/register").post(validateRegister, createUser);
usersRouter.route("/:id").delete(checkAuth as any, checkAdmin, deleteUser);

export default usersRouter;
