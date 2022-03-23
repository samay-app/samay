import { useState } from "react";
import Link from "next/link";
import { Button, Form, Row, Col, Container, Jumbotron } from "react-bootstrap";
import ResponseMessage from "../ResponseMessage";
import Layout from "../Layout";
import { signupUser } from "../../utils/api/server";

const SignUp = (): JSX.Element => {
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [response, setResponse] = useState({
    status: false,
    msg: "",
  });

  const { username, email, password, confirmPassword } = userCredentials;

  const handleSubmit = async (
    e: React.MouseEvent<HTMLInputElement>
  ): Promise<void> => {
    e.preventDefault();

    if (password !== confirmPassword) {
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
        confirmPassword: "",
      });

      if (signupUserResponse.statusCode === 201) {
        //
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
      <Container className="kukkee-container">
        <Row className="jumbo-row">
          <Col className="jumbo-col-black">
            <Jumbotron className="poll-create">
              <Form.Group as={Row} controlId="formPlainTextTitle">
                <Form.Label className="kukkee-form-label text-sm">
                  username
                </Form.Label>
                <Form.Control
                  className="kukkee-form-text title text-sm"
                  type="text"
                  placeholder="What's it about?"
                  name="username"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group as={Row} controlId="formPlainTextTitle">
                <Form.Label className="kukkee-form-label text-sm">
                  email
                </Form.Label>
                <Form.Control
                  className="kukkee-form-text title text-sm"
                  type="text"
                  placeholder="What's it about?"
                  name="email"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group as={Row} controlId="formPlainTextTitle">
                <Form.Label className="kukkee-form-label text-sm">
                  password
                </Form.Label>
                <Form.Control
                  className="kukkee-form-text title text-sm"
                  type="password"
                  placeholder="What's it about?"
                  name="password"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group as={Row} controlId="formPlainTextTitle">
                <Form.Label className="kukkee-form-label text-sm">
                  confirmpassword
                </Form.Label>
                <Form.Control
                  className="kukkee-form-text title text-sm"
                  type="password"
                  placeholder="What's it about?"
                  name="confirmpassword"
                  onChange={handleChange}
                />
              </Form.Group>
            </Jumbotron>
            <Link href="/auth/signin">
              <a className="hover:underline self-end">
                Already have an account? Sign in
              </a>
            </Link>
            <Button
              className="kukkee-primary-button create-poll-btn"
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
            <ResponseMessage response={response} setResponse={setResponse} />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default SignUp;
