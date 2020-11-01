import { IOrderAction } from "../../types/orders-interfaces";
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,
} from "./../constants/constants";

const orderCreateReducer = (state = {}, action: IOrderAction) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { ...state, loading: true };
    case ORDER_CREATE_SUCCESS:
      return { ...state, loading: false, success: true, order: action.payload };
    case ORDER_CREATE_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error,
      };
    default:
      return state;
  }
};

const orderDetailsReducer = (state = {}, action: IOrderAction) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case ORDER_DETAILS_SUCCESS:
      return { ...state, loading: false, order: action.payload };
    case ORDER_DETAILS_FAIL:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

const orderPayReducer = (state = {}, action: IOrderAction) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return { ...state, loading: true };
    case ORDER_PAY_SUCCESS:
      return { ...state, loading: false, success: true };
    case ORDER_PAY_FAIL:
      return { ...state, loading: false, error: action.error };
    case ORDER_PAY_RESET:
      return state;
    default:
      return state;
  }
};

export { orderCreateReducer, orderDetailsReducer, orderPayReducer };
