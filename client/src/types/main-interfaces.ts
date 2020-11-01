import { ICartAction, IShippingAddress } from "./cart-interfaces";
import { IOrderAction } from "./orders-interfaces";
import { IUser } from "./user-interfaces";

interface IInitialState {
  productList: { products: Array<any>; loading: boolean; error: null };
  loggedInUser: { userDetails: IUser; loading: boolean; error: any };
  profile: { userProfile: IUser; loading: boolean; error: any };
  cart: ICartAction;
  createdOrder: IOrderAction;
}

export type { IInitialState };
