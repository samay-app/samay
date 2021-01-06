import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { NextPage } from "next";
import Link from "next/link";
import Router from "next/router";

// private route for logged in users only
const privateAuthWrapper = (Component: NextPage): JSX.Element => {
  const Auth = (props: JSX.Element): JSX.Element => {
    const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);

    useEffect(() => {
      if (!isLoggedIn) {
        Router.push("/404");
      }
    }, [isLoggedIn]);

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
