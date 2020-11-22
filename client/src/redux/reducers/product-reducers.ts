import { IProductAction } from "../../types/products-interfaces";
import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
} from "../constants/constants";

const productListReducer = (
  state: { products: Array<any>; loading: Boolean; error: null } = {
    products: [],
    loading: false,
    error: null,
  },
  action: IProductAction
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
        successDelete: false,
      };
    case PRODUCT_LIST_FAIL:
      return { ...state, loading: false, error: action.error };
    case PRODUCT_DELETE_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { ...state, loading: false, successDelete: true };
    case PRODUCT_DELETE_FAIL:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

const productDetailsReducer = (
  state = { product: {} },
  action: IProductAction
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { ...state, loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export { productListReducer, productDetailsReducer };
