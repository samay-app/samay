import React, { useState, useEffect } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/app";
import "firebase/auth";

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
          <button
            type="button"
            onClick={(): object => firebase.auth().signOut()}
          >
            Sign-out
          </button>
        </div>
      ) : (
        // add sign funtions here
        <div>
          <p>Please sign-in:</p>
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
