import express, { Router } from "express";
import { getProducts } from "../controllers/products-controller";

const productsRouter: Router = express.Router();

productsRouter.route("/").get(getProducts);

export default productsRouter;
