import { useState } from "react";
import { Button, Form, Container, Jumbotron, Spinner } from "react-bootstrap";
import Router from "next/router";
import { signIn } from "next-auth/react";
import ResponseMessage from "../ResponseMessage";
import { signupUser } from "../../utils/api/server";
import { validEmail, validPassword } from "../../helpers/auth";

const SignUp = (): JSX.Element => {
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [response, setResponse] = useState({
    status: false,
    msg: "",
  });

  const [disabled, setDisabled] = useState<boolean>(false);

  const { username, email, password } = userCredentials;

  const handleSubmit = async (
    e: React.MouseEvent<HTMLInputElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!username) {
      setResponse({
        status: true,
        msg: "Please provide a username.",
      });
      return;
    }
    if (!email) {
      setResponse({
        status: true,
        msg: "Please provide a email address.",
      });
      return;
    }
    if (!validEmail.test(email)) {
      setResponse({
        status: true,
        msg: "Please provide a valid email address.",
      });
      return;
    }
    if (!password) {
      setResponse({
        status: true,
        msg: "Please provide a password.",
      });
      return;
    }
    if (!validPassword.test(password)) {
      setResponse({
        status: true,
        msg:
          "Password must be between 8 to 15 characters, containing at least one lowercase letter, one uppercase letter, one numeric digit, and one special character.",
      });
      return;
    }

    setDisabled(true);
    try {
      const signupUserResponse = await signupUser({
        username,
        email,
        password,
      });

      if (signupUserResponse.statusCode === 201) {
        await signIn("credentials", {
          redirect: false,
          username,
          password,
        });
        Router.push("/");
      } else if (signupUserResponse.statusCode === 422) {
        setDisabled(false);
        setResponse({
          status: true,
          msg: signupUserResponse.data.message,
        });
        return;
      }
    } catch (error) {
      setDisabled(false);
      setResponse({
        status: true,
        msg: "Please try again later.",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    setUserCredentials({
      ...userCredentials,
      [name]: value,
    });
  };

  return (
    <Container className="auth-outer-container">
      <div className="auth-inner-container">
        <div className="auth-logo">
          <img alt="logo" src="/logo.svg" />
        </div>
        <Jumbotron className="auth-first-jumbo">
          <Form>
            <Form.Group controlId="username">
              <Form.Label className="form-label">Username</Form.Label>
              <Form.Control
                className="form-text"
                type="text"
                placeholder="Username"
                name="username"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label className="form-label">Email address</Form.Label>
              <Form.Control
                className="form-text"
                type="text"
                placeholder="Email address"
                name="email"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label className="form-label">Password</Form.Label>
              <Form.Control
                className="form-text "
                type="password"
                placeholder="•••••••••••••"
                name="password"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Button
                className="auth-button"
                onClick={handleSubmit}
                disabled={disabled}
                type="submit"
              >
                {!disabled ? (
                  `Sign up`
                ) : (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="form-button-spinner"
                    />
                  </>
                )}
              </Button>
            </Form.Group>
          </Form>
        </Jumbotron>
        <Jumbotron className="auth-second-jumbo">
          Have an account?{" "}
          <a onClick={(): Promise<undefined> => signIn()} aria-hidden="true">
            Sign in
          </a>
          .
        </Jumbotron>
        <ResponseMessage response={response} setResponse={setResponse} />
      </div>
    </Container>
  );
};

export default SignUp;
