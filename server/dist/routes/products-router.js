"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_controllers_1 = require("../controllers/products-controllers");
const productsRouter = express_1.default.Router();
productsRouter.route("/").get(products_controllers_1.getProducts);
productsRouter.route("/:id").get(products_controllers_1.getSingleProduct);
exports.default = productsRouter;
