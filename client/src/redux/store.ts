import { createStore, combineReducers, applyMiddleware, Store } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productDetailsReducer,
  productListReducer,
} from "./reducers/product-reducers";
import { cartReducer } from "./reducers/cart-reducer";
import { IInitialState } from "../types/main-interfaces";
import userReducer from "./reducers/user-reducer";

const cartItemsFromLS = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems") as string)
  : [];

const userDetailsFromLS = localStorage.getItem("userDetails")
  ? JSON.parse(localStorage.getItem("userDetails") as string)
  : null;

const initialState: IInitialState = {
  productList: { products: [], loading: false, error: null },
  loggedInUser: { userDetails: userDetailsFromLS, loading: false, error: null },
  cart: { cartItems: cartItemsFromLS },
};

const rootReducer: any = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  loggedInUser: userReducer,
});
const middlewares = [thunk];

const store: Store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
