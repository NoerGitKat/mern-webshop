import { Dispatch } from "redux";
import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants/constants";

const listProducts = () => async (dispatch: Dispatch) => {
  try {
    // 1. Send request
    const reqAction = { type: PRODUCT_LIST_REQUEST };
    dispatch(reqAction);

    // 2. Receive products
    const response: Response = await fetch("/api/products");
    const products = await response.json();

    if (products.length > 0) {
      const successAction = { type: PRODUCT_LIST_SUCCESS, payload: products };
      dispatch(successAction);
    } else {
      const failAction = {
        type: PRODUCT_LIST_FAIL,
        error: "No products found!",
      };
      dispatch(failAction);
    }
  } catch (error) {
    const failAction = {
      type: PRODUCT_LIST_FAIL,
      error: error.message,
    };
    dispatch(failAction);
  }
};

export { listProducts };
