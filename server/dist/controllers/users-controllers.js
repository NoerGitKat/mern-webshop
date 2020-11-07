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
exports.updateUserById = exports.getUserById = exports.deleteUser = exports.getAllUsers = exports.updateUserProfile = exports.createUser = exports.loginUser = void 0;
const express_validator_1 = require("express-validator");
const generate_token_1 = __importDefault(require("../util/generate-token"));
const hash_password_1 = __importDefault(require("../util/hash-password"));
const User_1 = __importDefault(require("./../models/User"));
// @desc Get all users
// @route GET /api/users
// @access  Private (admin)
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find({});
        if (users) {
            return res.status(200).json(users);
        }
        else {
            return res.status(404).json([{ msg: "No users found." }]);
        }
    }
    catch (error) {
        return res.status(500).json([{ msg: error.message }]);
    }
});
exports.getAllUsers = getAllUsers;
// @desc Log user in
// @route POST /api/users/login
// @access  Public
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors);
    }
    try {
        const foundUser = yield User_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
        if (foundUser) {
            // Update or keep the old value
            foundUser.username = req.body.username || foundUser.username;
            foundUser.email = req.body.email || foundUser.email;
            if (req.body.password) {
                const hashedPassword = yield hash_password_1.default(req.body.password);
                foundUser.password = hashedPassword;
            }
            const updatedUser = yield foundUser.save();
            return res.status(200).json({
                _id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
            });
        }
        else {
            return res
                .status(404)
                .json([{ msg: "There's no user with this profile!" }]);
        }
    }
    catch (error) {
        return res
            .status(500)
            .json([{ msg: "Something went wrong with updating. Try again later." }]);
    }
});
exports.updateUserProfile = updateUserProfile;
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
// @desc Delete user
// @route DELETE /api/users/:id
// @access  Private (admin)
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const foundUser = yield User_1.default.findById(id);
        if (foundUser) {
            foundUser.remove();
            return res.status(200).json([{ msg: "User successfully removed." }]);
        }
        else {
            return res.status(404).json([{ msg: "User doesn't exist." }]);
        }
    }
    catch (error) {
        return res.status(500).json([{ msg: error.message }]);
    }
});
exports.deleteUser = deleteUser;
// @desc Get user by id
// @route GET /api/users/:id
// @access Private (admin)
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const foundUser = yield User_1.default.findById(id).select("-password");
        if (foundUser) {
            return res.status(200).json(foundUser);
        }
        else {
            return res.status(404).json([{ msg: "User not found." }]);
        }
    }
    catch (error) {
        return res.status(500).json([{ msg: error.msg }]);
    }
});
exports.getUserById = getUserById;
// @desc Update user by id
// @route PUT /api/users/:id
// @access Private (admin)
const updateUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { username, email, isAdmin } = req.body;
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors);
    }
    try {
        const foundUser = yield User_1.default.findById(id).select("-password");
        if (foundUser) {
            foundUser.username = username || foundUser.username;
            foundUser.email = email || foundUser.email;
            foundUser.isAdmin = isAdmin;
            const updatedUser = yield foundUser.save();
            return res.status(200).json({
                _id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
            });
        }
        else {
            return res.status(404).json([{ msg: "Couldn't find user." }]);
        }
    }
    catch (error) {
        return res.status(500).json([{ msg: error.msg }]);
    }
});
exports.updateUserById = updateUserById;
