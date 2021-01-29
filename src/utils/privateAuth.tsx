import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { NextPage } from "next";
import Link from "next/link";
import Router from "next/router";
import { RootState } from "src/store/store";

// private route for logged in users only
const privateAuthWrapper = (Component: NextPage) => {
  const Auth = (props: any) => {
    const isLoggedIn = useSelector((state: RootState) => state.authReducer.isLoggedIn);

    useEffect(() => {
      if (!isLoggedIn) {
        Router.push("/");
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
