import { Request, Response } from "express";
import products from "../data/products";

const getProducts = (req: Request, res: Response): void => {
  res.send(JSON.stringify(products));
};

const getSingleProduct = (req: Request, res: Response): void => {
  const { id } = req.params;

  const foundProduct = products.find((product) => product._id === id);

  if (foundProduct) {
    res.send(JSON.stringify(foundProduct));
  } else {
    res.send({});
  }
};

export { getProducts, getSingleProduct };
