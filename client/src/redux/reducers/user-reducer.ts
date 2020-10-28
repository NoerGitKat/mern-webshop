import { IUserAction } from "../../types/user-interfaces";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
} from "../constants/constants";

const userReducer = (state = {}, action: IUserAction) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true };
    case USER_LOGIN_SUCCESS:
      return { ...state, loading: false, userDetails: action.payload };
    case USER_LOGIN_FAIL:
      return { ...state, loading: false, error: action.error };
    case USER_LOGOUT:
      return { ...state, userDetails: null };
    default:
      return state;
  }
};

export default userReducer;
