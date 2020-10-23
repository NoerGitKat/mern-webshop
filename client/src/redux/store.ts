import { createStore, combineReducers, applyMiddleware, Store } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productDetailsReducer,
  productListReducer,
} from "./reducers/product-reducers";
import { cartReducer } from "./reducers/cart-reducer";
import { IInitialState } from "../types/main-interfaces";

const cartItemsFromLS = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems") as string)
  : [];

const initialState: IInitialState = {
  // productList: {
  //   products: [
  //     {
  //       _id: "",
  //       name: "",
  //       image: "",
  //       description: "",
  //       brand: "",
  //       category: "",
  //       price: 0,
  //       countInStock: 0,
  //       rating: 0,
  //       numReviews: 0,
  //       qty: 0,
  //     },
  //   ],
  //   loading: false,
  //   error: null,
  // },
  // productDetails: {
  //   loading: false,
  //   error: { name: "", message: "", stack: undefined },
  //   product: {
  //     _id: "",
  //     name: "",
  //     image: "",
  //     description: "",
  //     brand: "",
  //     category: "",
  //     price: 0,
  //     countInStock: 0,
  //     rating: 0,
  //     numReviews: 0,
  //     qty: 0,
  //   },
  // },
  cart: { cartItems: cartItemsFromLS },
};

const rootReducer: any = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
});
const middlewares = [thunk];

const store: Store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
