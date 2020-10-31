import { Dispatch } from "redux";
import { IShippingAddress } from "../../types/cart-interfaces";
import {
  CART_ADD_FAIL,
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from "../constants/constants";

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

const removeFromCart = (id: string) => (
  dispatch: Dispatch,
  getState: () => { cart: { cartItems: any } }
) => {
  const action = {
    type: CART_REMOVE_ITEM,
    payload: id,
  };
  dispatch(action);

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

const saveShippingAddress = (data: IShippingAddress) => (
  dispatch: Dispatch
) => {
  // 1. Put data in state
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  // 2. Save data in localStorage
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

const savePaymentMethod = (paymentMethod: string) => (dispatch: Dispatch) => {
  // 1. Put data in state
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: paymentMethod,
  });

  // 2. Save data in localStorage
  localStorage.setItem("paymentMethod", JSON.stringify(paymentMethod));
};

export { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod };
