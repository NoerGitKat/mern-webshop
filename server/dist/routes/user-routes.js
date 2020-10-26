"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controllers_1 = require("../controllers/users-controllers");
const check_auth_1 = __importDefault(require("../middlewares/check-auth"));
const validation_1 = require("../middlewares/validation");
const usersRouter = express_1.Router();
usersRouter.route("/login").post(validation_1.validateLogin, users_controllers_1.loginUser);
usersRouter.route("/profile").get(check_auth_1.default, users_controllers_1.getUserProfile);
exports.default = usersRouter;
