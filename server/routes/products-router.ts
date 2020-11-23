import express, { Router } from "express";
import {
  deleteProduct,
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
} from "../controllers/products-controllers";
import checkAdmin from "../middlewares/check-admin";
import checkAuth from "../middlewares/check-auth";
import { validateNewProduct } from "./../middlewares/validation";

const productsRouter: Router = express.Router();

productsRouter
  .route("/")
  .get(getProducts)
  .post(checkAuth as any, checkAdmin, validateNewProduct, createProduct);
productsRouter
  .route("/:id")
  .get(getSingleProduct)
  .put(checkAuth as any, checkAdmin, validateNewProduct, updateProduct)
  .delete(checkAuth as any, checkAdmin, deleteProduct);

export default productsRouter;
