import { IOrderAction } from "../../types/orders-interfaces";
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
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

export { orderCreateReducer };
