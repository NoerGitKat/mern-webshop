import { ICartAction, IShippingAddress } from "./cart-interfaces";
import { IOrder, IOrderAction } from "./orders-interfaces";
import { IUser } from "./user-interfaces";

interface IInitialState {
  productList: {
    products: Array<any>;
    loading: boolean;
    error: null;
    successDelete: boolean;
    successCreate: boolean;
  };
  loggedInUser: { userDetails: IUser; loading: boolean; error: any };
  profile: { userProfile: IUser; loading: boolean; error: any };
  cart: ICartAction;
  createdOrder: IOrderAction;
  orderPay: { success: boolean; loading: boolean; error: any };
  myOrders: { orders: IOrder[]; loading: boolean; error: any };
  userList: {
    users: IUser[];
    loading: boolean;
    error: any;
    successDelete: boolean;
  };
}

export type { IInitialState };
