import { Router } from "express";
import {
  loginUser,
  createUser,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  getUserById,
  updateUserById,
} from "../controllers/users-controllers";
import checkAdmin from "../middlewares/check-admin";
import checkAuth from "../middlewares/check-auth";
import {
  validateLogin,
  validateRegister,
  validateUpdateProfile,
  validateUpdateUser,
} from "../middlewares/validation";

const usersRouter: Router = Router();

usersRouter.route("/").get(checkAuth as any, checkAdmin, getAllUsers);
usersRouter.route("/login").post(validateLogin, loginUser);
usersRouter
  .route("/profile")
  .put(validateUpdateProfile, checkAuth as any, updateUserProfile);
usersRouter.route("/register").post(validateRegister, createUser);
usersRouter
  .route("/:id")
  .get(checkAuth as any, getUserById)
  .put(checkAuth as any, checkAdmin, validateUpdateUser, updateUserById)
  .delete(checkAuth as any, checkAdmin, deleteUser);

export default usersRouter;
