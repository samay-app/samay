import { AnyAction } from "redux";
import { SET_LOGIN_STATE, RESET_LOGIN_STATE } from "./type";
import { AuthState } from "./state";

const initialState: AuthState = {
  server: "",
  client: "",
  isLoggedIn: false,
  displayName: "",
  username: "",
  token: "",
};

// Later imported as `authReducer` in store.ts
export default function reducer(
  state: AuthState = initialState,
  action: AnyAction
) {
  switch (action.type) {
    case SET_LOGIN_STATE:
      return {
        ...state,
        isLoggedIn: true,
        displayName: action.payload.displayName,
        username: action.payload.username,
        token: action.payload.token,
      };
    case RESET_LOGIN_STATE:
      return {
        ...state,
        isLoggedIn: false,
        displayName: "",
        username: "",
        token: "",
      };
    default:
      return state;
  }
}
