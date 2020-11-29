import e, { Request, Response } from "express";
import { validationResult } from "express-validator";
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

// @desc Delete single product
// @route DELETE /api/products/:id
// @access Private (admin)
const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const foundProduct = await Product.findById(id);
    if (foundProduct) {
      await foundProduct.remove();
      return res.status(204).json({ msg: "Product successfully removed!" });
    } else {
      return res.status(404).json([{ msg: "Couldn't find product!" }]);
    }
  } catch (error) {
    return res.status(500).json([{ msg: error.message }]);
  }
};

// @desc Create new product
// @route POST /api/products
// @access Private (admin)
const createProduct = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors);
  }

  const { name, price, image, brand, category, description } = req.body;

  try {
    const foundProduct = await Product.findOne({ name });

    if (foundProduct) {
      return res.status(422).json([{ msg: "Product already exists!" }]);
    } else {
      const newProduct = new Product({
        name,
        price,
        image: image || "/images/sample.jpg",
        user: req.user?.id,
        brand,
        category,
        countInStock: 0,
        numReviews: 0,
        description,
      });

      await newProduct.save();

      return res.status(201).json(newProduct);
    }
  } catch (error) {
    return res.status(500).json([{ msg: error.message }]);
  }
};

// @desc Update a product
// @route PUT /api/products/:id
// @access Private (admin)
const updateProduct = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors);
  }

  const { id } = req.params;
  const {
    name,
    price,
    image,
    brand,
    category,
    countInStock,
    description,
  } = req.body;

  try {
    const foundProduct: any = await Product.findById(id);

    if (foundProduct) {
      foundProduct.name = name;
      foundProduct.price = price;
      foundProduct.image = image || "images/sample.jpg";
      foundProduct.brand = brand;
      foundProduct.category = category;
      foundProduct.countInStock = countInStock;
      foundProduct.description = description;

      await foundProduct.save();

      return res.status(200).json(foundProduct);
    } else {
      return res.status(404).json([{ msg: "Couldn't find product!" }]);
    }
  } catch (error) {
    return res.status(500).json([{ msg: error.message }]);
  }
};

export {
  getProducts,
  getSingleProduct,
  deleteProduct,
  createProduct,
  updateProduct,
};
