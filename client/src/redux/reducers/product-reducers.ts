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
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_SUCCESS,
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
        successCreate: false,
      };
    case PRODUCT_LIST_FAIL:
      return { ...state, loading: false, error: action.error };
    case PRODUCT_DELETE_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { ...state, loading: false, successDelete: true };
    case PRODUCT_DELETE_FAIL:
      return { ...state, loading: false, error: action.error };
    case PRODUCT_CREATE_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_CREATE_FAIL:
      return { ...state, loading: false, error: action.error };
    case PRODUCT_CREATE_SUCCESS:
      return { ...state, loading: false, successCreate: true };
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
    case PRODUCT_UPDATE_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_UPDATE_FAIL:
      return { ...state, loading: false, error: action.error };
    case PRODUCT_UPDATE_SUCCESS:
      return { ...state, loading: false, product: action.payload };
    case PRODUCT_CREATE_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_CREATE_FAIL:
      return { ...state, loading: false, error: action.error };
    case PRODUCT_CREATE_SUCCESS:
      return { ...state, loading: false, successCreate: true };
    default:
      return state;
  }
};

export { productListReducer, productDetailsReducer };
