import { Dispatch } from "redux";
import { CART_ADD_FAIL, CART_ADD_ITEM } from "../constants/constants";

const addToCart = (id: string, qty: number) => async (
  dispatch: Dispatch,
  getState: () => { cart: { cartItems: any } }
) => {
  try {
    // 1. Get product from DB
    const response = await fetch(`/api/products/${id}`);
    const product = await response.json();

    // 2. Dispatch to change state
    const action = {
      type: CART_ADD_ITEM,
      payload: { ...product, qty },
    };
    dispatch(action);

    // 3. Store in localStorage
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    const failAction = {
      type: CART_ADD_FAIL,
      error: error.message,
    };

    dispatch(failAction);
  }
};

export { addToCart };
