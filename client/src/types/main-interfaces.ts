import { ICartAction } from "./cart-interfaces";
import { IProductAction } from "./products-interfaces";
import { IUser } from "./user-interfaces";

interface IInitialState {
  productList: { products: Array<any>; loading: boolean; error: null };
  // productDetails: {
  //   loading: boolean;
  //   error: { name: string; message: string; stack: string | undefined };
  //   product: {};
  // };
  loggedInUser: { userDetails: IUser; loading: boolean; error: any };
  cart: ICartAction;
}

export type { IInitialState };
