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
exports.createNewOrder = void 0;
const express_validator_1 = require("express-validator");
const Order_1 = __importDefault(require("../models/Order"));
// @desc Create new order
// @route POST api/order
// @access Private
const createNewOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice, } = req.body;
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors);
    }
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
