import { IProductAction } from "../../types/products-interfaces";
import { CART_ADD_ITEM } from "./../constants/constants";

const cartReducer = (state = { cartItems: [{}] }, action: IProductAction) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const newItem = action.payload;

      // 1. Check if added item already exists in cart
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem === newItem
      );

      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((cartItem) =>
            cartItem === existingItem ? newItem : cartItem
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, newItem] };
      }
    default:
      return state;
  }
};

export { cartReducer };
