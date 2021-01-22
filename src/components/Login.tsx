import React from "react";
import Router from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { auth, firebase } from "./Firebase";
import { login, logout } from "../store/auth/action";
import { RootState } from "src/store/store";

const Login = (): JSX.Element => {
  const isLoggedIn = useSelector((state: RootState) => state.authReducer.isLoggedIn);
  const dispatch = useDispatch();

  const googleLogin = async (): Promise<void> => {
    // 1 - init Google Auth Provider
    const provider = new firebase.auth.GoogleAuthProvider();
    // 2 - create the popup signIn
    await auth.signInWithPopup(provider).then(async () => {
      const user = auth.currentUser;
      // token generated
      const token = user && (await user.getIdToken());
      user && dispatch(login(user.displayName, user.email, token));
      Router.push(`/dashboard`);
    });
  };

  const googleLogout = (): void => {
    firebase.auth().signOut();
    dispatch(logout());
  };

  return (
    <div>
      {!isLoggedIn ? (
        <Button
          className="rm-primary-button-outline-small"
          onClick={googleLogin}
        >
          Log in with Google
        </Button>
      ) : (
          <Button
            className="rm-primary-button-outline-small"
            onClick={googleLogout}
          >
            Logout
          </Button>
        )}
    </div>
  );
};

export default Login;
