import React from "react";
import { Button } from "react-bootstrap";
import { auth, firebase } from "./Firebase";
import { login, logout } from "../store/auth/action"
import { useSelector, useDispatch } from "react-redux";

export default function Login(): JSX.Element {

  async function googleLogin(): Promise<void> {
    // 1 - init Google Auth Provider
    const provider = new firebase.auth.GoogleAuthProvider();
    // 2 - create the popup signIn
    await auth.signInWithPopup(provider).then(async (result) => {
      const user = auth.currentUser;
      // token generated
      const token = user && (await user.getIdToken());
      console.log(user.displayName)
      console.log(token)
      dispatch(login(user.displayName, user.email, token))
    });
  }

  function googleLogout() {
    firebase.auth().signOut()
    dispatch(logout())
  }

  const currentLoggedInUserID = useSelector((state) => state.authReducer.username); // get stuff from store
  const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);
  const dispatch = useDispatch();

  return (
    <div>
      { !isLoggedIn ? (
        <Button
          variant="outline-primary"
          className="login-button"
          onClick={googleLogin}
        >
          Log in with Google
        </Button>
      ) : (
          <Button
            variant="outline-primary"
            className="login-button"
            onClick={googleLogout}
          >
            Logout
          </Button>)}

    </div>
  );
}
