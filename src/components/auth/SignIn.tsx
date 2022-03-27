import { useState } from "react";
import { NextRouter } from "next/router";
import {
  Button,
  Form,
  Row,
  Col,
  Container,
  Jumbotron,
  Spinner,
} from "react-bootstrap";
import { signIn, useSession, SignInResponse } from "next-auth/react";
import ResponseMessage from "../ResponseMessage";
import Layout from "../Layout";

const SignIn = (props: {
  router: NextRouter;
  csrfToken: string;
}): JSX.Element => {
  const { router, csrfToken } = props;

  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: "",
    csrfToken: "",
  });

  const [response, setResponse] = useState({
    status: false,
    msg: "",
  });

  const [disabled, setDisabled] = useState<boolean>(false);

  const { data: session } = useSession();

  const { username, password } = userCredentials;

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
    if (!password) {
      setResponse({
        status: true,
        msg: "Please enter your password.",
      });
      return;
    }

    if (!session) {
      setDisabled(true);
      try {
        const result: SignInResponse | undefined = await signIn<"credentials">(
          "credentials",
          {
            redirect: false,
            username,
            password,
          }
        );

        if (result && !result.error) {
          if (router.query.from && typeof router.query?.from === "string") {
            router.push(router.query.from);
          } else if (
            router.query.callbackUrl &&
            typeof router.query?.callbackUrl === "string"
          ) {
            router.push(router.query.callbackUrl);
          } else {
            router.replace("/");
          }
        } else {
          setDisabled(false);
          setResponse({
            status: true,
            msg: "Please check your username and password.",
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
    } else {
      router.push("/");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <Layout>
      <div className="kukkee-main-heading">
        <Container className="kukkee-container">Sign in</Container>
      </div>
      <Container className="kukkee-container">
        <Row className="jumbo-row">
          <Col className="jumbo-col">
            <Form>
              <Jumbotron className="kukkee-jumbo">
                <input
                  name="csrfToken"
                  onChange={handleChange}
                  type="hidden"
                  defaultValue={csrfToken}
                  hidden
                />
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
              </Jumbotron>
              <Button
                className="kukkee-primary-button auth-button"
                onClick={handleSubmit}
                disabled={disabled}
                type="submit"
              >
                {!disabled ? (
                  `Sign in`
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
            </Form>
            <ResponseMessage response={response} setResponse={setResponse} />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default SignIn;
