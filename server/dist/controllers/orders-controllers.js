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
exports.updateOrderToPaid = exports.getOrderById = exports.createNewOrder = void 0;
const express_validator_1 = require("express-validator");
const Order_1 = __importDefault(require("../models/Order"));
// @desc Create new order
// @route POST /api/orders/
// @access Private
const createNewOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors);
    }
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice, } = req.body;
    try {
        const newOrder = new Order_1.default({
            orderItems,
            user: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });
        const createdOrder = yield newOrder.save();
        return res.status(201).json(createdOrder);
    }
    catch (error) {
        return res.status(500).json([{ msg: error.message }]);
    }
});
exports.createNewOrder = createNewOrder;
// @desc Get order by Id
// @route GET /api/orders/:id
// @access Private
const getOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const foundOrder = yield Order_1.default.findById(id).populate("user", "username email");
        if (foundOrder) {
            return res.status(200).json(foundOrder);
        }
        else {
            return res.status(404).json({ msg: "Couldn't find order." });
        }
    }
    catch (error) {
        return res.status(500).json([{ msg: error.message }]);
    }
});
exports.getOrderById = getOrderById;
// @desc Update order to be paid
// @route PUT /api/orders/:id/pay
// @access Private
const updateOrderToPaid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const foundOrder = yield Order_1.default.findById(id);
        if (foundOrder) {
            foundOrder.isPaid = true;
            foundOrder.paidAt = new Date();
            foundOrder.paymentDetails = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.payer.email_address,
            };
            const updatedOrder = yield foundOrder.save();
            return res.status(200).json(updatedOrder);
        }
        else {
            return res.status(404).json([{ msg: "Product not found." }]);
        }
    }
    catch (error) {
        return res.status(500).json([{ msg: error.message }]);
    }
});
exports.updateOrderToPaid = updateOrderToPaid;
