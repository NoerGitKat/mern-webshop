"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controllers_1 = require("../controllers/users-controllers");
const check_admin_1 = __importDefault(require("../middlewares/check-admin"));
const check_auth_1 = __importDefault(require("../middlewares/check-auth"));
const validation_1 = require("../middlewares/validation");
const usersRouter = express_1.Router();
usersRouter.route("/").get(check_auth_1.default, check_admin_1.default, users_controllers_1.getAllUsers);
usersRouter.route("/login").post(validation_1.validateLogin, users_controllers_1.loginUser);
usersRouter
    .route("/profile")
    .put(validation_1.validateUpdateProfile, check_auth_1.default, users_controllers_1.updateUserProfile);
usersRouter.route("/register").post(validation_1.validateRegister, users_controllers_1.createUser);
usersRouter
    .route("/:id")
    .get(check_auth_1.default, check_admin_1.default, users_controllers_1.getUserById)
    .put(check_auth_1.default, check_admin_1.default, validation_1.validateUpdateUser, users_controllers_1.updateUserById)
    .delete(check_auth_1.default, check_admin_1.default, users_controllers_1.deleteUser);
exports.default = usersRouter;
