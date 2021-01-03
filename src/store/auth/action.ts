import { SET_LOGIN_STATE, RESET_LOGIN_STATE } from "./type";

// auth actions to dispatch from login components
// Usage: - import to desired components
// - `Usedispatch()` from "react-redux" to dispatch  :D

export const login = () => (dispatch: any) => {
  return dispatch({
    type: SET_LOGIN_STATE,
    payload: true,
  });
};

export const logout = () => (dispatch: any) => {
  return dispatch({
    type: RESET_LOGIN_STATE,
    payload: false,
  });
};
