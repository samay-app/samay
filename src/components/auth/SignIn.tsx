import { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "react-bootstrap";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";

const SignIn = (): JSX.Element => {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const { data: session } = useSession();

  const router = useRouter();

  const { email, password } = userCredentials;

  const handleSubmit = async (
    e: React.MouseEvent<HTMLInputElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!session) {
      try {
        const result = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });

        // if (!result?.error) {
        //   router.replace("/");
        // }
      } catch (error) {
        //
      }
    } else {
      router.push("/");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="mt-10 flex flex-col items-center w-3/5 mx-auto space-y-4">
      <h1 className="text-xl">Sign In</h1>
      <form className="form">
        <input
          className="input"
          type="email"
          placeholder="Email Address"
          required
          value={email}
          onChange={handleChange}
          name="email"
          autoComplete="email"
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={handleChange}
          name="password"
          autoComplete="password"
        />
        <div className="flex flex-col md:flex-row flex-1 space-y-6 md:space-y-0 md:space-x-6">
          <Button
            className="kukkee-primary-button create-poll-btn"
            onClick={handleSubmit}
          >
            Sign In
          </Button>
        </div>
      </form>
      <div className="flex flex-col items-start md:flex-row md:justify-between w-full">
        <Link href="/auth/signup">
          <a className="hover:underline">Don't have an account? Sign Up</a>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
