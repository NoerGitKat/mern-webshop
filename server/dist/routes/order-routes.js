"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controllers_1 = require("../controllers/order-controllers");
const check_auth_1 = __importDefault(require("../middlewares/check-auth"));
const validation_1 = require("../middlewares/validation");
const ordersRouter = express_1.Router();
ordersRouter.route("/").post(validation_1.validateOrder, check_auth_1.default, order_controllers_1.createNewOrder);
exports.default = ordersRouter;
