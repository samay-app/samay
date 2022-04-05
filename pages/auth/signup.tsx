import Head from "next/head";
import SignUp from "../../src/components/auth/SignUp";

const NEXT_PUBLIC_BRAND_NAME = process.env.NEXT_PUBLIC_BRAND_NAME || "";

const SignUpPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Sign Up | {NEXT_PUBLIC_BRAND_NAME}</title>
        <link rel="shortcut icon" href="/logo.svg" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <SignUp />
    </>
  );
};

export default SignUpPage;
