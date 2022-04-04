import Head from "next/head";
import SignUp from "../../src/components/auth/SignUp";

const SignUpPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Sign Up | Kukkee</title>
        <link rel="shortcut icon" href="/logo.svg" />
        <meta name="description" content="Kukkee" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <SignUp />
    </>
  );
};

export default SignUpPage;
