"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_controller_1 = require("../controllers/products-controller");
const productsRouter = express_1.default.Router();
productsRouter.route("/").get(products_controller_1.getProducts);
productsRouter.route("/:id").get(products_controller_1.getSingleProduct);
exports.default = productsRouter;
