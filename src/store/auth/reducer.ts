import { AnyAction } from "redux";
import { SET_LOGIN_STATE, RESET_LOGIN_STATE } from "./type";

interface authState {
  server: string;
  client: string;
  isLoggedIn: Boolean;
  username: string;
  token: string;
}

const initialState: authState = {
  server: "",
  client: "",
  isLoggedIn: false,
  username: "",
  token: ""
};

// Later imported as `authReducer` in store.ts
export default function reducer(state: authState = initialState, action: AnyAction) {
  switch (action.type) {
    case SET_LOGIN_STATE:
      return { ...state, isLoggedIn: action.payload };
    case RESET_LOGIN_STATE:
      return { ...state, isLoggedIn: action.payload };
    default:
      return state;
  }
}
