import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NextPage } from "next";
import Link from "next/link";
import Router from "next/router";
import { RootState } from "../store/store";
import { firebase } from "./firebase";
import { login } from "../store/auth/action";

// private route for logged in users only
const privateAuthWrapper = (Component: NextPage) => {
  const Auth = (props: any) => {
    const isLoggedIn = useSelector(
      (state: RootState) => state.authReducer.isLoggedIn
    );
    const dispatch = useDispatch();
    useEffect(() => {
      if (!isLoggedIn) {
        Router.push("/");
      }
    }, [isLoggedIn]);

    useEffect(() => {
      /*
       an observer for changes to the `signed-in user's ID token`, 
       which includes sign-in, sign-out, and token refresh events.
       https://firebase.google.com/docs/reference/js/firebase.auth.Auth#onidtokenchanged
       */
      firebase.auth().onIdTokenChanged((user) => {
        if (user) {
          user.getIdToken().then((token) => {
            // console.log(token)
            dispatch(
              login({
                displayName: user.displayName,
                username: user.email,
                token,
              })
            );
          });
        }
      });
    });

    // If user is not logged in, return login component
    if (isLoggedIn === false) {
      return (
        <>
          Not authorised!!
          <Link href="/">
            <a>Go back to landing page</a>
          </Link>
        </>
      );
    }
    // If user is logged in, return original component
    return <Component {...props} />;
  };
  return Auth;
};

export default privateAuthWrapper;
