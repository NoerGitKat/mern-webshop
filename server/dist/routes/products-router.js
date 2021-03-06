"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_controllers_1 = require("../controllers/products-controllers");
const check_admin_1 = __importDefault(require("../middlewares/check-admin"));
const check_auth_1 = __importDefault(require("../middlewares/check-auth"));
const validation_1 = require("./../middlewares/validation");
const productsRouter = express_1.default.Router();
productsRouter
    .route("/")
    .get(products_controllers_1.getProducts)
    .post(check_auth_1.default, check_admin_1.default, validation_1.validateNewProduct, products_controllers_1.createProduct);
productsRouter
    .route("/:id")
    .get(products_controllers_1.getSingleProduct)
    .put(check_auth_1.default, check_admin_1.default, validation_1.validateNewProduct, products_controllers_1.updateProduct)
    .delete(check_auth_1.default, check_admin_1.default, products_controllers_1.deleteProduct);
exports.default = productsRouter;
