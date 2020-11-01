import { Dispatch } from "redux";
import { IOrder } from "../../types/orders-interfaces";
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
} from "./../constants/constants";

const createOrder = (orderData: IOrder, token: string) => async (
  dispatch: Dispatch
) => {
  const reqAction = {
    type: ORDER_CREATE_REQUEST,
  };

  dispatch(reqAction);

  try {
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    };

    const response = await fetch("/api/orders", request);
    const parsedResponse = await response.json();

    if (parsedResponse.orderItems) {
      const successAction = {
        type: ORDER_CREATE_SUCCESS,
        payload: parsedResponse,
      };

      dispatch(successAction);
    } else {
      const failAction = {
        type: ORDER_CREATE_FAIL,
        error: "Couldn't make an order.",
      };

      dispatch(failAction);
    }
  } catch (error) {
    const failAction = {
      type: ORDER_CREATE_FAIL,
      error: error.message,
    };

    dispatch(failAction);
  }
};

export { createOrder };
