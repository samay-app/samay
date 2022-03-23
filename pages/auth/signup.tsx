import Head from "next/head";
import SignUp from "../../src/components/auth/SignUp";

const SignUpPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Sign Up</title>
        <meta name="description" content="Kukkee" />
      </Head>

      <SignUp />
    </>
  );
};

export default SignUpPage;
