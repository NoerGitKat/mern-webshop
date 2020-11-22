import express, { Router } from "express";
import {
  deleteProduct,
  getProducts,
  getSingleProduct,
} from "../controllers/products-controllers";
import checkAdmin from "../middlewares/check-admin";
import checkAuth from "../middlewares/check-auth";

const productsRouter: Router = express.Router();

productsRouter.route("/").get(getProducts);
productsRouter
  .route("/:id")
  .get(getSingleProduct)
  .delete(checkAuth as any, checkAdmin, deleteProduct);

export default productsRouter;
