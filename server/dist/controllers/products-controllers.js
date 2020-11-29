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
exports.updateProduct = exports.createProduct = exports.deleteProduct = exports.getSingleProduct = exports.getProducts = void 0;
const express_validator_1 = require("express-validator");
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
// @desc Delete single product
// @route DELETE /api/products/:id
// @access Private (admin)
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const foundProduct = yield Product_1.default.findById(id);
        if (foundProduct) {
            yield foundProduct.remove();
            return res.status(204).json({ msg: "Product successfully removed!" });
        }
        else {
            return res.status(404).json([{ msg: "Couldn't find product!" }]);
        }
    }
    catch (error) {
        return res.status(500).json([{ msg: error.message }]);
    }
});
exports.deleteProduct = deleteProduct;
// @desc Create new product
// @route POST /api/products
// @access Private (admin)
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors);
    }
    const { name, price, image, brand, category, description } = req.body;
    try {
        const foundProduct = yield Product_1.default.findOne({ name });
        if (foundProduct) {
            return res.status(422).json([{ msg: "Product already exists!" }]);
        }
        else {
            const newProduct = new Product_1.default({
                name,
                price,
                image: image || "/images/sample.jpg",
                user: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
                brand,
                category,
                countInStock: 0,
                numReviews: 0,
                description,
            });
            yield newProduct.save();
            return res.status(201).json(newProduct);
        }
    }
    catch (error) {
        return res.status(500).json([{ msg: error.message }]);
    }
});
exports.createProduct = createProduct;
// @desc Update a product
// @route PUT /api/products/:id
// @access Private (admin)
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors);
    }
    const { id } = req.params;
    const { name, price, image, brand, category, countInStock, description, } = req.body;
    try {
        const foundProduct = yield Product_1.default.findById(id);
        if (foundProduct) {
            foundProduct.name = name;
            foundProduct.price = price;
            foundProduct.image = image || "images/sample.jpg";
            foundProduct.brand = brand;
            foundProduct.category = category;
            foundProduct.countInStock = countInStock;
            foundProduct.description = description;
            yield foundProduct.save();
            return res.status(200).json(foundProduct);
        }
        else {
            return res.status(404).json([{ msg: "Couldn't find product!" }]);
        }
    }
    catch (error) {
        return res.status(500).json([{ msg: error.message }]);
    }
});
exports.updateProduct = updateProduct;
