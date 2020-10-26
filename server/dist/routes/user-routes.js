"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controllers_1 = require("../controllers/users-controllers");
const validation_1 = require("../middlewares/validation");
const usersRouter = express_1.Router();
usersRouter.route("/login").post(validation_1.validateLogin, users_controllers_1.loginUser);
exports.default = usersRouter;
