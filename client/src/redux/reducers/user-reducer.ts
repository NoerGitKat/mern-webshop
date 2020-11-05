import { IUserAction } from "../../types/user-interfaces";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_GET_PROFILE_REQUEST,
  USER_GET_PROFILE_SUCCESS,
  USER_GET_PROFILE_FAIL,
  USER_GET_PROFILE_RESET,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
} from "../constants/constants";

const userReducer = (state = {}, action: IUserAction) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
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

const userProfileReducer = (state = {}, action: IUserAction) => {
  switch (action.type) {
    case USER_GET_PROFILE_REQUEST:
      return { ...state, loading: true };
    case USER_GET_PROFILE_SUCCESS:
      return { ...state, loading: false, userProfile: action.payload };
    case USER_GET_PROFILE_FAIL:
      return { ...state, loading: false, error: action.error };
    case USER_GET_PROFILE_RESET:
      return { ...state, userProfile: {} };
    case USER_UPDATE_PROFILE_REQUEST:
      return { ...state, loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        userProfile: action.payload,
        error: null,
      };
    case USER_UPDATE_PROFILE_FAIL:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export { userReducer, userProfileReducer };
