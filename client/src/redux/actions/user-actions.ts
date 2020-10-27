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

    const user = await fetch("/api/users/login", request);

    if (user) {
      const successAction = {
        type: USER_LOGIN_SUCCESS,
        payload: user,
      };

      dispatch(successAction);

      localStorage.setItem("userDetails", JSON.stringify(user));
    } else {
      throw new Error(
        "Something went wrong with logging you in. Try again later."
      );
    }
  } catch (error) {
    const failAction = {
      type: USER_LOGIN_FAIL,
      error: error.message,
    };

    dispatch(failAction);
  }
};

export { logUserIn };
