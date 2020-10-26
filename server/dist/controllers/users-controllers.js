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
exports.loginUser = void 0;
const express_validator_1 = require("express-validator");
const User_1 = __importDefault(require("./../models/User"));
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors);
    }
    const { email, password } = req.body;
    try {
        const user = yield User_1.default.findOne({ email });
        console.log("user", user);
        if (!user) {
            res.status(401).json({ msg: "User doesn't exist." });
        }
        else {
            // Check password
            const passwordMatches = yield user.matchPasswords(password, user.password);
            if (passwordMatches) {
                res.status(200).json({
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: null,
                });
            }
            else {
                return res.status(401).json({ msg: "Password is incorrect." });
            }
        }
    }
    catch (error) {
        return res
            .status(500)
            .json({ msg: "Something went wrong. Try again later." });
    }
});
exports.loginUser = loginUser;
