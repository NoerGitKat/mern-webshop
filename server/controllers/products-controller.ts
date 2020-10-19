import { Request, Response } from "express";
import products from "../data/products";

const getProducts = (req: Request, res: Response): void => {
  res.send(JSON.stringify(products));
};

export { getProducts };
