"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUserProfile = exports.loginUser = void 0;
const express_validator_1 = require("express-validator");
const generate_token_1 = __importDefault(require("../util/generate-token"));
const hash_password_1 = __importDefault(require("../util/hash-password"));
const User_1 = __importDefault(require("./../models/User"));
// @desc Log user in
// @route POST /api/users/login
// @access  Public
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors);
    }
    const { email, password } = req.body;
    try {
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.status(401).json([{ msg: "User doesn't exist." }]);
        }
        else {
            // Check password
            const passwordMatches = yield user.matchPasswords(password, user.password);
            if (passwordMatches) {
                // Generate token
                const token = generate_token_1.default(user._id);
                return res.status(200).json({
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token,
                });
            }
            else {
                return res.status(401).json([{ msg: "Password is incorrect." }]);
            }
        }
    }
    catch (error) {
        return res
            .status(500)
            .json([{ msg: "Something went wrong. Try again later." }]);
    }
});
exports.loginUser = loginUser;
// @desc Log user in
// @route POST /api/users/login
// @access  Public
const getUserProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.user.id);
        if (user) {
            return res.status(200).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin,
            });
        }
        else {
            return res.status(404).json([{ msg: "User not found." }]);
        }
    }
    catch (error) {
        return res
            .status(500)
            .json([{ msg: "Something went wrong. Try again later." }]);
    }
});
exports.getUserProfile = getUserProfile;
// @desc Create a new user
// @route POST /api/users/register
// @access Public
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Validation
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors);
    }
    const { username, password, email } = req.body;
    try {
        // Check if user already exists
        const userExists = yield User_1.default.findOne({ email });
        if (userExists) {
            return res
                .status(400)
                .json([{ msg: "User already exists with that email." }]);
        }
        else {
            const hashedPassword = yield hash_password_1.default(password);
            const newUser = {
                username,
                email,
                password: hashedPassword,
                isAdmin: false,
            };
            const createdUser = yield User_1.default.create(newUser);
            if (createdUser) {
                const token = generate_token_1.default(createdUser._id);
                return res.status(201).json({
                    _id: createdUser._id,
                    username: createdUser.username,
                    email: createdUser.email,
                    isAdmin: createdUser.isAdmin,
                    token,
                });
            }
            else {
                return res.status(400).json([
                    {
                        msg: "Something went wrong during registration. Try again later.",
                    },
                ]);
            }
        }
    }
    catch (error) {
        console.log("Error happened!", error.message);
        return res
            .status(500)
            .json([{ msg: "Something went wrong. Try again later." }]);
    }
});
exports.createUser = createUser;
