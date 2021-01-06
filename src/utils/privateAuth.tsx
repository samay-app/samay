import React, { useEffect } from 'react';
import Link from "next/link";
import { useSelector } from "react-redux";
import Router from "next/router";
import { NextPage } from 'next'

// private route for logged in users only

const privateAuthWrapper = (Component: NextPage) => {
    const Auth = (props: any) => {
        // Login data from redux-store 
        const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);

        useEffect(() => {
            if (!isLoggedIn) {
                Router.push("/404")
            }
        }, [])

        // If user is not logged in, return login component
        if (isLoggedIn == false) {
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
        return (
            <Component {...props} />
        );
    };

    return Auth;
};

export default privateAuthWrapper;