"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orders_controllers_1 = require("../controllers/orders-controllers");
const check_auth_1 = __importDefault(require("../middlewares/check-auth"));
const validation_1 = require("../middlewares/validation");
const ordersRouter = express_1.Router();
ordersRouter.route("/myorders").get(check_auth_1.default, orders_controllers_1.getMyOrders);
ordersRouter.route("/").post(validation_1.validateOrder, check_auth_1.default, orders_controllers_1.createNewOrder);
ordersRouter.route("/:id").get(check_auth_1.default, orders_controllers_1.getOrderById);
ordersRouter.route("/:id/pay").put(check_auth_1.default, orders_controllers_1.updateOrderToPaid);
exports.default = ordersRouter;
