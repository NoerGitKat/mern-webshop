// @desc Create new order
// @route POST /api/orders/

import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Order from "../models/Order";

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

export { createNewOrder };
