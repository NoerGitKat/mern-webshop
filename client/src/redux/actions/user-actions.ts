import { ICredentials } from "../../types/user-interfaces";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
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

  dispatch(logoutAction);

  localStorage.removeItem("userDetails");
};

export { logUserIn, logUserOut };
