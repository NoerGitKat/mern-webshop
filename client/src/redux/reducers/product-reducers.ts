import { IProductAction } from "../../types/products";
import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants/constants";

const productListReducer = (
  initialState = { products: [] },
  action: IProductAction
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_SUCCESS:
      return { loading: true, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: true, error: action.error };
    default:
      return initialState;
  }
};

export { productListReducer };
