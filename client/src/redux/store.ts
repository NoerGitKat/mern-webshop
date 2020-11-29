import { createStore, combineReducers, applyMiddleware, Store } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productDetailsReducer,
  productListReducer,
} from "./reducers/product-reducers";
import { cartReducer } from "./reducers/cart-reducer";
import { IInitialState } from "../types/main-interfaces";
import {
  userListReducer,
  userProfileReducer,
  userReducer,
} from "./reducers/user-reducer";
import {
  myOrdersReducer,
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
} from "./reducers/orders-reducer";

const cartItemsFromLS = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems") as string)
  : [];

const addressFromLS = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress") as string)
  : { address: "", city: "", country: "", postalCode: "" };

const methodFromLS = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod") as string)
  : "";

const userDetailsFromLS = localStorage.getItem("userDetails")
  ? JSON.parse(localStorage.getItem("userDetails") as string)
  : null;

const initialState: IInitialState = {
  productList: {
    products: [],
    loading: false,
    error: null,
    successDelete: false,
    successCreate: false,
  },
  loggedInUser: { userDetails: userDetailsFromLS, loading: false, error: null },
  profile: {
    userProfile: {
      username: "",
      email: "",
      password: "",
      isAdmin: false,
      token: "",
    },
    loading: false,
    error: null,
  },
  cart: {
    cartItems: cartItemsFromLS,
    shippingAddress: addressFromLS,
    paymentMethod: methodFromLS,
  },
  createdOrder: {
    order: null,
    loading: false,
    error: null,
    success: false,
  },
  orderPay: { success: false, loading: false, error: null },
  myOrders: { orders: [], loading: false, error: null },
  userList: { users: [], loading: false, error: null, successDelete: false },
};

const rootReducer: any = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  loggedInUser: userReducer,
  profile: userProfileReducer,
  createdOrder: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  myOrders: myOrdersReducer,
  userList: userListReducer,
});
const middlewares = [thunk];

const store: Store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
