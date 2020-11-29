import { ICartAction } from "./cart-interfaces";
import { IOrder, IOrderAction } from "./orders-interfaces";
import { IProduct } from "./products-interfaces";
import { IUser } from "./user-interfaces";

interface IInitialState {
  productList: {
    products: IProduct[];
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
  productDetails: {};
}

export type { IInitialState };
