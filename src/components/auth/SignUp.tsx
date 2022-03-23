import { useState } from "react";
import { Button, Form, Row, Col, Container, Jumbotron } from "react-bootstrap";
import Router from "next/router";
import { signIn } from "next-auth/react";
import ResponseMessage from "../ResponseMessage";
import Layout from "../Layout";
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

  const { username, email, password } = userCredentials;

  const handleSubmit = async (
    e: React.MouseEvent<HTMLInputElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!username) {
      setResponse({
        status: true,
        msg: "Please enter your username.",
      });
      return;
    }
    if (!email) {
      setResponse({
        status: true,
        msg: "Please enter your email address.",
      });
      return;
    }
    if (!validEmail.test(email)) {
      setResponse({
        status: true,
        msg: "Please enter a valid email address.",
      });
      return;
    }
    if (!password) {
      setResponse({
        status: true,
        msg: "Please enter a password.",
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

    try {
      const signupUserResponse = await signupUser({
        username,
        email,
        password,
      });

      setUserCredentials({
        username: "",
        email: "",
        password: "",
      });

      if (signupUserResponse.statusCode === 201) {
        await signIn("credentials", {
          redirect: false,
          email,
          password,
        });
        Router.push("/");
      }
    } catch (error) {
      //
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
    <Layout>
      <div className="kukkee-main-heading">
        <Container className="kukkee-container">Sign up</Container>
      </div>
      <Container className="kukkee-container">
        <Row className="jumbo-row">
          <Col className="jumbo-col">
            <Jumbotron className="kukkee-jumbo">
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
                  placeholder="**********"
                  name="password"
                  onChange={handleChange}
                />
              </Form.Group>
            </Jumbotron>
            <Button
              className="kukkee-primary-button auth-button"
              onClick={handleSubmit}
            >
              Sign up
            </Button>
            <ResponseMessage response={response} setResponse={setResponse} />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default SignUp;
