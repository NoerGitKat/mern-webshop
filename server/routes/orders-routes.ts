import { Router } from "express";
import {
  createNewOrder,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
} from "../controllers/orders-controllers";
import checkAuth from "../middlewares/check-auth";
import { validateOrder } from "../middlewares/validation";

const ordersRouter = Router();

ordersRouter.route("/myorders").get(checkAuth as any, getMyOrders);
ordersRouter.route("/").post(validateOrder, checkAuth as any, createNewOrder);
ordersRouter.route("/:id").get(checkAuth as any, getOrderById);
ordersRouter.route("/:id/pay").put(checkAuth as any, updateOrderToPaid);

export default ordersRouter;
