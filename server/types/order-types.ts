import { Document } from "mongoose";
import { IProduct } from "./product-types";

interface IShippingAddress {
  address: string;
  city: string;
  country: string;
  postalCode: string;
}

interface IOrder extends Document {
  _id: string;
  orderItems: IProduct[];
  shippingAddress: IShippingAddress;
  paymentMethod: string;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  paymentDetails: {
    id: string;
    status: string;
    update_time: string;
    email_address: string;
  };
  isPaid: boolean;
  paidAt: Date;
  isDelivered: Boolean;
  deliveredAt: Date;
}

export type { IOrder };
