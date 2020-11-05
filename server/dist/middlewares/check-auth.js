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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const checkAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    if (authorization) {
        const token = authorization.split(" ")[1];
        try {
            const isAuthorized = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            if (isAuthorized) {
                // Add user to request
                req.user = yield User_1.default.findById(isAuthorized.id).select("-password");
                next();
            }
            else {
                return res.status(401).json([{ msg: "Please login again." }]);
            }
        }
        catch (error) {
            return res.status(500).json([{ msg: error.message }]);
        }
    }
    else {
        return res.status(401).json([{ msg: "You must login first." }]);
    }
});
exports.default = checkAuth;
