import { Dispatch } from "redux";
import { IProduct } from "../../types/products-interfaces";
import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_SUCCESS,
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

const deleteProduct = (token: string, id: string) => async (
  dispatch: Dispatch
) => {
  const reqAction = {
    type: PRODUCT_DELETE_REQUEST,
  };
  dispatch(reqAction);

  try {
    const request = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(`/api/products/${id}`, request);

    if (response.ok) {
      const successAction = {
        type: PRODUCT_DELETE_SUCCESS,
      };
      dispatch(successAction);
    } else {
      const failAction = {
        type: PRODUCT_DELETE_FAIL,
        error: "Couldn't delete product, try again later!",
      };
      dispatch(failAction);
    }
  } catch (error) {
    const failAction = {
      type: PRODUCT_DELETE_FAIL,
      error,
    };
    dispatch(failAction);
  }
};

const createProduct = (token: string, productDetails: IProduct) => async (
  dispatch: Dispatch
) => {
  const reqAction = {
    type: PRODUCT_CREATE_REQUEST,
  };
  dispatch(reqAction);

  try {
    const request = {
      method: "POST",
      body: JSON.stringify(productDetails),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(`/api/products`, request);

    if (response.ok) {
      const successAction = {
        type: PRODUCT_CREATE_SUCCESS,
      };
      dispatch(successAction);
    } else {
      const failAction = {
        type: PRODUCT_CREATE_FAIL,
        error: "Couldn't create product, try again later!",
      };
      dispatch(failAction);
    }
  } catch (error) {
    const failAction = {
      type: PRODUCT_CREATE_FAIL,
      error,
    };
    dispatch(failAction);
  }
};

const updateProduct = (
  token: string,
  productId: string,
  productDetails: IProduct
) => async (dispatch: Dispatch) => {
  const reqAction = {
    type: PRODUCT_UPDATE_REQUEST,
  };
  dispatch(reqAction);

  try {
    const request = {
      method: "PUT",
      body: JSON.stringify(productDetails),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    console.log("request is", request);

    const response = await fetch(`/api/products/${productId}`, request);

    if (response.ok) {
      const successAction = {
        type: PRODUCT_UPDATE_SUCCESS,
      };
      dispatch(successAction);
    } else {
      const failAction = {
        type: PRODUCT_UPDATE_FAIL,
        error: "Couldn't update product, try again later!",
      };
      dispatch(failAction);
    }
  } catch (error) {
    const failAction = {
      type: PRODUCT_UPDATE_FAIL,
      error,
    };
    dispatch(failAction);
  }
};

export {
  listProducts,
  listSingleProduct,
  deleteProduct,
  createProduct,
  updateProduct,
};
