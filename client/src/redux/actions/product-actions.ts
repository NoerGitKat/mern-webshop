import { Dispatch } from "redux";
import { IProduct } from "../../types/products-interfaces";
import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from "../constants/constants";

const listProducts = () => async (dispatch: Dispatch) => {
  try {
    // 1. Send request
    const reqAction = { type: PRODUCT_LIST_REQUEST };
    dispatch(reqAction);

    // 2. Receive products
    const response: Response = await fetch("/api/products");
    const products: IProduct[] = await response.json();

    if (products && products.length > 0) {
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

const listSingleProduct = (id: string) => async (dispatch: Dispatch) => {
  try {
    // 1. Send request
    const reqAction = { type: PRODUCT_DETAILS_REQUEST };
    dispatch(reqAction);

    // 2. Receive product
    const response: Response = await fetch(`/api/products/${id}`);
    const product: IProduct = await response.json();

    if (product) {
      const successAction = {
        type: PRODUCT_DETAILS_SUCCESS,
        payload: product,
      };
      dispatch(successAction);
    } else {
      const failAction = {
        type: PRODUCT_DETAILS_FAIL,
        error: "No product found!",
      };
      dispatch(failAction);
    }
  } catch (error) {
    const failAction = {
      type: PRODUCT_DETAILS_FAIL,
      error: error.message,
    };
    dispatch(failAction);
  }
};

export { listProducts, listSingleProduct };
