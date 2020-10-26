import { Router } from "express";
import { loginUser, getUserProfile } from "../controllers/users-controllers";
import checkAuth from "../middlewares/check-auth";
import { validateLogin } from "../middlewares/validation";

const usersRouter: Router = Router();

usersRouter.route("/login").post(validateLogin, loginUser);
usersRouter.route("/profile").get(checkAuth as any, getUserProfile as any);

export default usersRouter;
