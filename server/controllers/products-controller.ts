import { Request, Response } from "express";

const getProducts = (req: Request, res: Response) => {
  res.send(JSON.stringify([{ name: "noer" }]));
};

export { getProducts };
