import React, { useState, useEffect } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/app";
import "firebase/auth";
import { Button } from "react-bootstrap";

interface COFIG {
  apiKey: string;
  authDomain: string;
}

const config = {
  apiKey: "AIzaSyDi8gy5XMUNVOvStG2kw8yZDR-ZW-5KE3o",
  authDomain: "rocketauth-d71f0.firebaseapp.com",
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
} else {
  firebase.app(); // if already initialized, use that one
}

const Login: React.FC = () => {
  const [isSignedIn, setisSignedIn] = useState(false);

  const uiConfig = {
    signInFlow: "popup",
    signInSuccessUrl: "/dashboard",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  };
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => setisSignedIn(!!user));
  }, [isSignedIn]);

  return (
    <div>
      {isSignedIn ? (
        <div>
          <Button
            variant="outline-dark"
            onClick={(): object => firebase.auth().signOut()}
          >
            Sign-out
          </Button>
        </div>
      ) : (
        // add sign funtions here
        <div>
          {/* Google sign in button */}

          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </div>
      )}
    </div>
  );
};
export default Login;
