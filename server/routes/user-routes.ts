import { Router } from "express";
import { loginUser } from "../controllers/users-controllers";
import { validateLogin } from "../middlewares/validation";

const usersRouter: Router = Router();

usersRouter.route("/login").post(validateLogin, loginUser);

export default usersRouter;
