import { Dispatch } from "redux";
import { ICredentials } from "../../types/user-interfaces";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_GET_PROFILE_REQUEST,
  USER_GET_PROFILE_SUCCESS,
  USER_GET_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_GET_PROFILE_RESET,
  ORDER_MYORDERS_RESET,
  USER_GET_ALL_REQUEST,
  USER_GET_ALL_SUCCESS,
  USER_GET_ALL_FAIL,
  USER_GET_ALL_RESET,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
} from "../constants/constants";

const logUserIn = (credentials: ICredentials) => async (
  dispatch: (arg0: { type: string; payload?: Response; error?: any }) => void
) => {
  const reqAction = {
    type: USER_LOGIN_REQUEST,
  };

  dispatch(reqAction);

  try {
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials) as any,
    };

    const response = await fetch("/api/users/login", request);
    const parsedResponse = await response.json();

    if (parsedResponse.token) {
      const user = parsedResponse;
      const successAction = {
        type: USER_LOGIN_SUCCESS,
        payload: user,
      };

      dispatch(successAction);

      localStorage.setItem("userDetails", JSON.stringify(user));
    } else {
      const errorMessage = parsedResponse;
      const failAction = {
        type: USER_LOGIN_FAIL,
        error: parsedResponse.errors || errorMessage,
      };

      dispatch(failAction);
    }
  } catch (error) {
    const failAction = {
      type: USER_LOGIN_FAIL,
      error,
    };

    dispatch(failAction);
  }
};

const logUserOut = () => (dispatch: (arg0: { type: string }) => void) => {
  const logoutAction = {
    type: USER_LOGOUT,
  };

  const resetProfileAction = {
    type: USER_GET_PROFILE_RESET,
  };

  const resetMyOrdersAction = {
    type: ORDER_MYORDERS_RESET,
  };

  const resetUserListAction = {
    type: USER_GET_ALL_RESET,
  };

  dispatch(resetProfileAction);
  dispatch(resetMyOrdersAction);
  dispatch(resetUserListAction);
  dispatch(logoutAction);

  localStorage.removeItem("userDetails");
};

const registerUser = (credentials: ICredentials) => async (dispatch: any) => {
  // 1. Send request to active loading
  const reqAction = {
    type: USER_REGISTER_REQUEST,
  };

  dispatch(reqAction);
  try {
    // 2. Send request to server to post data
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    };
    const response = await fetch("/api/users/register", request);
    const parsedResponse = await response.json();

    if (parsedResponse.token) {
      // 3. Update register state if success
      const successAction = {
        type: USER_REGISTER_SUCCESS,
        payload: parsedResponse,
      };

      dispatch(successAction);

      // 4A. Update login state
      const successAction2 = {
        type: USER_LOGIN_SUCCESS,
        payload: parsedResponse,
      };

      dispatch(successAction2);

      localStorage.setItem("userDetails", JSON.stringify(parsedResponse));
    } else {
      const failAction = {
        type: USER_REGISTER_FAIL,
        error: parsedResponse.errors || parsedResponse,
      };

      dispatch(failAction);
    }

    // 4B. If error dispatch fail
  } catch (error) {
    const failAction = {
      type: USER_REGISTER_FAIL,
      error,
    };

    dispatch(failAction);
  }
};

const getProfile = (token: string, id: string) => async (
  dispatch: Dispatch
) => {
  const reqAction = {
    type: USER_GET_PROFILE_REQUEST,
  };

  dispatch(reqAction);

  try {
    const request = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(`/api/users/${id}`, request);
    const parsedResponse = await response.json();

    if (parsedResponse._id) {
      const successAction = {
        type: USER_GET_PROFILE_SUCCESS,
        payload: parsedResponse,
      };
      dispatch(successAction);
    } else {
      const failAction = {
        type: USER_GET_PROFILE_FAIL,
        error: parsedResponse.errors || parsedResponse,
      };
      dispatch(failAction);
    }
  } catch (error) {
    const failAction = {
      type: USER_GET_PROFILE_FAIL,
      error,
    };
    dispatch(failAction);
  }
};

const updateProfile = (
  token: string,
  credentials: ICredentials,
  id?: string
) => async (dispatch: any) => {
  const reqAction = {
    type: USER_UPDATE_PROFILE_REQUEST,
  };

  dispatch(reqAction);

  try {
    const endpoint = id ? `/api/users/${id}` : `/api/users/profile`;

    const request = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    };

    const response = await fetch(endpoint, request);
    const parsedResponse = await response.json();

    if (parsedResponse._id) {
      const successAction = {
        type: USER_UPDATE_PROFILE_SUCCESS,
        payload: parsedResponse,
      };
      dispatch(successAction);
    } else {
      const failAction = {
        type: USER_UPDATE_PROFILE_FAIL,
        error: parsedResponse.errors || parsedResponse,
      };
      dispatch(failAction);
    }
  } catch (error) {
    const failAction = {
      type: USER_UPDATE_PROFILE_FAIL,
      error,
    };
    dispatch(failAction);
  }
};

const getAllUsers = (token: string) => async (dispatch: Dispatch) => {
  const reqAction = { type: USER_GET_ALL_REQUEST };
  dispatch(reqAction);

  try {
    const request = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch("/api/users", request);
    const parsedResponse = await response.json();

    if (!parsedResponse[0].msg) {
      const successAction = {
        type: USER_GET_ALL_SUCCESS,
        payload: parsedResponse,
      };
      dispatch(successAction);
    } else {
      const failAction = {
        type: USER_GET_ALL_FAIL,
        error: parsedResponse[0].msg,
      };
      dispatch(failAction);
    }
  } catch (error) {
    const failAction = { type: USER_GET_ALL_FAIL, error };
    dispatch(failAction);
  }
};

const deleteUser = (token: string, id: string) => async (
  dispatch: Dispatch
) => {
  const reqAction = { type: USER_DELETE_REQUEST };
  dispatch(reqAction);

  try {
    const request = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(`/api/users/${id}`, request);
    const parsedResponse = await response.json();

    if (parsedResponse[0].msg === "User successfully removed.") {
      const successAction = { type: USER_DELETE_SUCCESS };
      dispatch(successAction);
    }
  } catch (error) {
    const failAction = { type: USER_DELETE_FAIL, error };
    dispatch(failAction);
  }
};

export {
  logUserIn,
  logUserOut,
  registerUser,
  getProfile,
  updateProfile,
  getAllUsers,
  deleteUser,
};
