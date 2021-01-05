import { SET_LOGIN_STATE, RESET_LOGIN_STATE } from "./type";

// auth actions to dispatch from login components
// Usage: - import to desired components
// - `Usedispatch()` from "react-redux" to dispatch  :D

export const login = (displayName: string, username: string, token: string) => (dispatch: any) => {

  // take username and token from args after auth is setup
  return dispatch({
    type: SET_LOGIN_STATE,
    payload: {
      displayName: displayName,
      username: username,
      token: token
    },
  });
};

export const logout = () => (dispatch: any) => {
  return dispatch({
    type: RESET_LOGIN_STATE
  });
};
