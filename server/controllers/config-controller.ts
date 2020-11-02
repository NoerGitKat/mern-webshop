import { Request, Response } from "express";

const getPayPalConfig = (req: Request, res: Response) => {
  return res.status(200).json(process.env.PAYPAL_CLIENT_ID);
};

export { getPayPalConfig };
