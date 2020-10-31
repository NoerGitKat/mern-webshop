import { IProduct } from "../../types/products-interfaces";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from "./../constants/constants";

const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action: any
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const newItem: any = action.payload;

      // 1. Check if added item already exists in cart
      const existingItem: IProduct | undefined = state.cartItems.find(
        (cartItem: IProduct) => cartItem._id === newItem._id
      );

      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((cartItem: IProduct) =>
            cartItem._id === existingItem!._id ? newItem : cartItem
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, newItem] };
      }
    case CART_REMOVE_ITEM:
      const id: string = action.payload;

      const filteredCart = state.cartItems.filter(
        (item: IProduct) => item._id !== id
      );

      return { ...state, cartItems: filteredCart };
    case CART_SAVE_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload };
    case CART_SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };

    default:
      return state;
  }
};

export { cartReducer };
