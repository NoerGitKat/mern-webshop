"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegister = exports.validateLogin = void 0;
const express_validator_1 = require("express-validator");
const validateLogin = [
    express_validator_1.check("email").isEmail().withMessage("Fill in a valid email address!"),
    express_validator_1.check("password").notEmpty().withMessage("Fill in your password!"),
];
exports.validateLogin = validateLogin;
const validateRegister = [
    express_validator_1.check("username")
        .matches(/^([A-z0-9!@#$%^&*().,<>{}[\]<>?_=+\-|;:\'\"\/])*[^\s]\1*$/)
        .withMessage("Fill in a username of at least 3 characters, no spaces allowed."),
    express_validator_1.check("email").isEmail().withMessage("Fill in a valid email address!"),
    express_validator_1.check("password")
        .matches(/(?=.*[A-Z])[A-Za-z\d@$!_%*-?&+]{8,}/)
        .withMessage("Your password should contain at least 8 characters, including 1 uppercase, 1 lowercase, 1 digit and a special character"),
];
exports.validateRegister = validateRegister;
