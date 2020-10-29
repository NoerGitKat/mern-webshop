import { IUserAction } from "../../types/user-interfaces";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from "../constants/constants";

const userReducer = (state = {}, action: IUserAction) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST || USER_REGISTER_REQUEST:
      return { ...state, loading: true };
    case USER_REGISTER_REQUEST:
      return { ...state, loading: true };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        userDetails: action.payload,
        error: null,
      };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        userDetails: action.payload,
        error: null,
      };
    case USER_LOGIN_FAIL:
      return { ...state, loading: false, error: action.error };
    case USER_REGISTER_FAIL:
      return { ...state, loading: false, error: action.error };
    case USER_LOGOUT:
      return { ...state, userDetails: null };
    default:
      return state;
  }
};

export { userReducer };
