import { Router } from "express";
import {
  createNewOrder,
  getOrderById,
} from "../controllers/orders-controllers";
import checkAuth from "../middlewares/check-auth";
import { validateOrder } from "../middlewares/validation";

const ordersRouter = Router();

ordersRouter.route("/").post(validateOrder, checkAuth as any, createNewOrder);
ordersRouter.route("/:id").get(checkAuth as any, getOrderById);

export default ordersRouter;
