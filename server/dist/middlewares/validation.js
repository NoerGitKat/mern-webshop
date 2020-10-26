"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = void 0;
const express_validator_1 = require("express-validator");
const validateLogin = [
    express_validator_1.check("email").isEmail().withMessage("Fill in a valid email address!"),
    express_validator_1.check("password").notEmpty().withMessage("Fill in your password!"),
];
exports.validateLogin = validateLogin;
