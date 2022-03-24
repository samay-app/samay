import Head from "next/head";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { useEffect } from "react";
import SignIn from "../../src/components/auth/SignIn";

const SignInPage = (): JSX.Element => {
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace("/");
      }
    });
  }, [router]);

  return (
    <>
      <Head>
        <title>Sign In</title>
        <meta name="description" content="Kukkee" />
      </Head>

      <SignIn router={router} />
    </>
  );
};

export default SignInPage;
