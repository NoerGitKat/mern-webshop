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

export { createNewOrder, getOrderById };
