"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = void 0;
const products_1 = __importDefault(require("../data/products"));
const getProducts = (req, res) => {
    res.send(JSON.stringify(products_1.default));
};
exports.getProducts = getProducts;
