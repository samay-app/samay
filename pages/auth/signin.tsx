import Head from "next/head";
import { useRouter } from "next/router";
import { getSession, getCsrfToken } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import SignIn from "../../src/components/auth/SignIn";

export default function SignInPage(props: { csrfToken: string }): JSX.Element {
  const { csrfToken } = props;

  const router = useRouter();

  return (
    <>
      <Head>
        <title>Sign In</title>
        <meta name="description" content="Kukkee" />
      </Head>

      <SignIn router={router} csrfToken={csrfToken} />
    </>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<
  | {
      props: {
        csrfToken: string | undefined;
      };
    }
  | {
      redirect: {
        permanent: boolean;
        destination: string;
      };
    }
> {
  const session = await getSession(context);

  if (session) {
    return { redirect: { permanent: false, destination: "/" } };
  }

  const csrfToken = await getCsrfToken({ req: context.req });
  return {
    props: { csrfToken },
  };
}
