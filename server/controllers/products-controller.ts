import { Request, Response } from "express";
import Product from "../models/Product";

// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ msg: `Can't fetch products. ${error.message}` });
  }
};

// @desc Fetch single product by id
// @route GET /api/products/:id
// @access Public
const getSingleProduct = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const foundProduct = await Product.findById(id);

    if (foundProduct) {
      res.status(200).json(foundProduct);
    } else {
      res.status(404).json({ msg: "Couldn't find this product." });
    }
  } catch (error) {
    res.status(500).json({ msg: `Can't fetch this product. ${error.message}` });
  }
};

export { getProducts, getSingleProduct };
