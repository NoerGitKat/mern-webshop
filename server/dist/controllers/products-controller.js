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
exports.getSingleProduct = exports.getProducts = void 0;
const Product_1 = __importDefault(require("../models/Product"));
// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield Product_1.default.find({});
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ msg: `Can't fetch products. ${error.message}` });
    }
});
exports.getProducts = getProducts;
// @desc Fetch single product by id
// @route GET /api/products/:id
// @access Public
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const foundProduct = yield Product_1.default.findById(id);
        if (foundProduct) {
            res.status(200).json(foundProduct);
        }
        else {
            res.status(404).json({ msg: "Couldn't find this product." });
        }
    }
    catch (error) {
        res.status(500).json({ msg: `Can't fetch this product. ${error.message}` });
    }
});
exports.getSingleProduct = getSingleProduct;
