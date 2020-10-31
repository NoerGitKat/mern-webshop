import { IProduct } from "./products-interfaces";

interface ICartAction {
  cartItems: IProduct[];
  shippingAddress: IShippingAddress;
}

interface IShippingAddress {
  address: string;
  city: string;
  country: string;
  postalCode: string;
}

export type { ICartAction, IShippingAddress };
