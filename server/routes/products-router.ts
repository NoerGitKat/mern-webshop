import express, { Router } from "express";
import {
  getProducts,
  getSingleProduct,
} from "../controllers/products-controller";

const productsRouter: Router = express.Router();

productsRouter.route("/").get(getProducts);
productsRouter.route("/:id").get(getSingleProduct);

export default productsRouter;
