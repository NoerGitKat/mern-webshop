"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateProduct = exports.validateNewProduct = exports.validateUpdateUser = exports.validateOrder = exports.validateUpdateProfile = exports.validateRegister = exports.validateLogin = void 0;
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
const validateUpdateProfile = [
    express_validator_1.check("username")
        .matches(/^([A-z0-9!@#$%^&*().,<>{}[\]<>?_=+\-|;:\'\"\/])*[^\s]\1*$/)
        .withMessage("Fill in a username of at least 3 characters, no spaces allowed."),
    express_validator_1.check("email").isEmail().withMessage("Fill in a valid email address!"),
    express_validator_1.check("password")
        .matches(/(?=.*[A-Z])[A-Za-z\d@$!_%*-?&+]{8,}/)
        .optional({ checkFalsy: true })
        .withMessage("Your password should contain at least 8 characters, including 1 uppercase, 1 lowercase, 1 digit and a special character"),
];
exports.validateUpdateProfile = validateUpdateProfile;
const validateOrder = [
    express_validator_1.check("orderItems").exists(),
    express_validator_1.check("shippingAddress").exists(),
    express_validator_1.check("paymentMethod").isString(),
    express_validator_1.check("itemsPrice")
        .isNumeric()
        .withMessage("Items price should be a number."),
    express_validator_1.check("taxPrice").isNumeric().withMessage("Tax price should be a number."),
    express_validator_1.check("shippingPrice")
        .isNumeric()
        .withMessage("Shipping price should be a number."),
    express_validator_1.check("totalPrice")
        .isNumeric()
        .withMessage("Total price should be a number."),
];
exports.validateOrder = validateOrder;
const validateUpdateUser = [
    express_validator_1.check("username").isString().withMessage("Fill in a valid username."),
    express_validator_1.check("email").isEmail().withMessage("Fill in a valid email."),
    express_validator_1.check("isAdmin")
        .isBoolean()
        .optional({ checkFalsy: true })
        .withMessage("Fill in a valid username."),
];
exports.validateUpdateUser = validateUpdateUser;
const validateNewProduct = [
    express_validator_1.check("name")
        .isString()
        .withMessage("Fill in a product name of at least 3 characters."),
    express_validator_1.check("price").isNumeric().withMessage("Price should be a number."),
    express_validator_1.check("image").isString().optional({ checkFalsy: true }),
    express_validator_1.check("brand").isString().withMessage("Brand name should be a string."),
    express_validator_1.check("category").isString().withMessage("Category should be a string."),
    express_validator_1.check("description")
        .isString()
        .isLength({ min: 6 })
        .withMessage("Fill in a descroption of at least 6 characters."),
];
exports.validateNewProduct = validateNewProduct;
const validateUpdateProduct = [
    express_validator_1.check("name")
        .isString()
        .isLength({ min: 3 })
        .withMessage("Fill in a product name of at least 3 characters."),
    express_validator_1.check("name"),
];
exports.validateUpdateProduct = validateUpdateProduct;
