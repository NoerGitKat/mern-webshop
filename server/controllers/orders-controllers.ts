import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Order from "../models/Order";

// @desc Create new order
// @route POST /api/orders/
// @access Private
const createNewOrder = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors);
  }

  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  try {
    const newOrder = new Order({
      orderItems,
      user: req.user?.id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await newOrder.save();

    return res.status(201).json(createdOrder);
  } catch (error) {
    return res.status(500).json([{ msg: error.message }]);
  }
};

// @desc Get order by Id
// @route GET /api/orders/:id
// @access Private
const getOrderById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const foundOrder = await Order.findById(id).populate(
      "user",
      "username email"
    );

    if (foundOrder) {
      return res.status(200).json(foundOrder);
    } else {
      return res.status(404).json({ msg: "Couldn't find order." });
    }
  } catch (error) {
    return res.status(500).json([{ msg: error.message }]);
  }
};

// @desc Update order to be paid
// @route PUT /api/orders/:id/pay
// @access Private
const updateOrderToPaid = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const foundOrder = await Order.findById(id);
    if (foundOrder) {
      foundOrder.isPaid = true;
      foundOrder.paidAt = new Date();
      foundOrder.paymentDetails = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };

      const updatedOrder = await foundOrder.save();

      return res.status(200).json(updatedOrder);
    } else {
      return res.status(404).json([{ msg: "Product not found." }]);
    }
  } catch (error) {
    return res.status(500).json([{ msg: error.message }]);
  }
};

const getMyOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({ user: req.user?.id });

    if (orders) {
      return res.status(200).json(orders);
    } else {
      return res.status(404).json([{ msg: "No orders found!" }]);
    }
  } catch (error) {
    return res.status(500).json([{ msg: error.message }]);
  }
};

export { createNewOrder, getOrderById, updateOrderToPaid, getMyOrders };
