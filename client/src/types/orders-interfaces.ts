import { IShippingAddress } from "./cart-interfaces";
import { IProduct } from "./products-interfaces";

interface IOrder {
  _id?: string;
  orderItems: IProduct[];
  shippingAddress: IShippingAddress;
  paymentMethod: string;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
}

interface IOrderAction {
  type?: string;
  loading: boolean;
  success?: boolean;
  error: any;
  order: IOrder | null;
  payload?: IOrder;
}

export type { IOrderAction, IOrder };
