import { ICartAction } from "./cart-interfaces";
import { IProductAction } from "./products-interfaces";

interface IInitialState {
  // productList: { products: Array<any>; loading: boolean; error: null };
  // productDetails: {
  //   loading: boolean;
  //   error: { name: string; message: string; stack: string | undefined };
  //   product: {};
  // };
  cart: ICartAction;
}

export type { IInitialState };
