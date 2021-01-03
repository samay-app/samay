import React from "react";
import { Button } from "react-bootstrap";
import { auth, firebase } from "./FIreBase";

export default function Login(): JSX.Element {
  async function googleLogin(): Promise<void> {
    // 1 - init Google Auth Provider
    const provider = new firebase.auth.GoogleAuthProvider();
    // 2 - create the popup signIn
    await auth.signInWithPopup(provider).then(async (result) => {
      const user = auth.currentUser;
      // token generated
      const token = user && (await user.getIdToken());
      // need to pass to server
    });
  }
  return (
    <div>
      <Button onClick={googleLogin} className="login-button">
        Sign in with Google
      </Button>
    </div>
  );
}
