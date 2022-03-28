import { useState } from "react";
import {
  Button,
  Form,
  Row,
  Col,
  Container,
  Jumbotron,
  Spinner,
} from "react-bootstrap";
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
        setDisabled(true);
        setResponse({
          status: true,
          msg: signupUserResponse.data.message,
        });
        return;
      }
    } catch (error) {
      setDisabled(true);
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
    <Container className="auth-container">
      <Row className="auth-row">
        <Col className="jumbo-col">
          <div className="auth-logo">
            <img alt="logo" src="/Kukkee.svg" className="d-inline-block" />
            Kukkee
          </div>
          <Jumbotron className="auth-jumbo">
            <Form>
              <Form.Group as={Row} controlId="username">
                <Form.Label className="kukkee-form-label text-sm">
                  Username
                </Form.Label>
                <Form.Control
                  className="kukkee-form-text title text-sm"
                  type="text"
                  placeholder="Username"
                  name="username"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group as={Row} controlId="email">
                <Form.Label className="kukkee-form-label text-sm">
                  Email address
                </Form.Label>
                <Form.Control
                  className="kukkee-form-text description text-sm"
                  type="text"
                  placeholder="Email address"
                  name="email"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group as={Row} controlId="password">
                <Form.Label className="kukkee-form-label text-sm">
                  Password
                </Form.Label>
                <Form.Control
                  className="kukkee-form-text location text-sm"
                  type="password"
                  placeholder="•••••••••••••"
                  name="password"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group as={Row}>
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
                        className="kukkee-button-spinner"
                      />
                    </>
                  )}
                </Button>
              </Form.Group>
            </Form>
          </Jumbotron>
          <Jumbotron className="kukkee-auth-secondary-jumbo">
            Have an account?{" "}
            <a onClick={(): Promise<undefined> => signIn()} aria-hidden="true">
              Sign in
            </a>
            .
          </Jumbotron>
          <ResponseMessage response={response} setResponse={setResponse} />
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
