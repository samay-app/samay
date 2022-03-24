import { useState } from "react";
import { NextRouter } from "next/router";
import { Button, Form, Row, Col, Container, Jumbotron } from "react-bootstrap";
import { signIn, useSession, SignInResponse } from "next-auth/react";
import ResponseMessage from "../ResponseMessage";
import Layout from "../Layout";

const SignIn = (props: { router: NextRouter }): JSX.Element => {
  const { router } = props;

  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const [response, setResponse] = useState({
    status: false,
    msg: "",
  });

  const { data: session } = useSession();

  const { email, password } = userCredentials;

  const handleSubmit = async (
    e: React.MouseEvent<HTMLInputElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!session) {
      try {
        const result: SignInResponse | undefined = await signIn<"credentials">(
          "credentials",
          {
            redirect: false,
            email,
            password,
          }
        );

        if (result && !result.error) {
          if (router.query.from && typeof router.query?.from === "string") {
            router.push(router.query.from);
          } else {
            router.replace("/");
          }
        } else {
          //
        }
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
    <Layout>
      <div className="kukkee-main-heading">
        <Container className="kukkee-container">Sign in</Container>
      </div>
      <Container className="kukkee-container">
        <Row className="jumbo-row">
          <Col className="jumbo-col">
            <Jumbotron className="kukkee-jumbo">
              <Form.Group as={Row} controlId="email">
                <Form.Label className="kukkee-form-label text-sm">
                  Email address
                </Form.Label>
                <Form.Control
                  className="kukkee-form-text title text-sm"
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
            </Jumbotron>
            <Button
              className="kukkee-primary-button auth-button"
              onClick={handleSubmit}
            >
              Sign in
            </Button>
            <ResponseMessage response={response} setResponse={setResponse} />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default SignIn;

// import { useState } from "react";
// import { NextRouter } from "next/router";
// import { Button, Form, Row, Col, Container, Jumbotron } from "react-bootstrap";
// import { signIn, useSession, SignInResponse } from "next-auth/react";
// import ResponseMessage from "../ResponseMessage";
// import Layout from "../Layout";

// const SignIn = (props: { router: NextRouter }): JSX.Element => {
//   const { router } = props;

//   const [userCredentials, setUserCredentials] = useState({
//     email: "",
//     password: "",
//   });

//   const [response, setResponse] = useState({
//     status: false,
//     msg: "",
//   });

//   const { data: session } = useSession();

//   const { email, password } = userCredentials;

//   const handleSubmit = async (
//     e: React.MouseEvent<HTMLInputElement>
//   ): Promise<void> => {
//     e.preventDefault();

//     if (!session) {
//       try {
//         const result: SignInResponse | undefined = await signIn<"credentials">(
//           "credentials",
//           {
//             redirect: false,
//             email,
//             password,
//           }
//         );

//         if (result && !result.error) {
//           router.replace("/");
//         }
//       } catch (error) {
//         //
//       }
//     } else if (
//       session &&
//       router.query.from &&
//       typeof router.query?.from === "string"
//     ) {
//       router.push(router.query.from);
//     } else {
//       router.push("/");
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
//     const { name, value } = e.target;

//     setUserCredentials({ ...userCredentials, [name]: value });
//   };

//   return (
//     <Layout>
//       <div className="kukkee-main-heading">
//         <Container className="kukkee-container">Sign in</Container>
//       </div>
//       <Container className="kukkee-container">
//         <Row className="jumbo-row">
//           <Col className="jumbo-col">
//             <Jumbotron className="kukkee-jumbo">
//               <Form.Group as={Row} controlId="email">
//                 <Form.Label className="kukkee-form-label text-sm">
//                   Email address
//                 </Form.Label>
//                 <Form.Control
//                   className="kukkee-form-text title text-sm"
//                   type="text"
//                   placeholder="Email address"
//                   name="email"
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//               <Form.Group as={Row} controlId="password">
//                 <Form.Label className="kukkee-form-label text-sm">
//                   Password
//                 </Form.Label>
//                 <Form.Control
//                   className="kukkee-form-text location text-sm"
//                   type="password"
//                   placeholder="•••••••••••••"
//                   name="password"
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//             </Jumbotron>
//             <Button
//               className="kukkee-primary-button auth-button"
//               onClick={handleSubmit}
//             >
//               Sign in
//             </Button>
//             <ResponseMessage response={response} setResponse={setResponse} />
//           </Col>
//         </Row>
//       </Container>
//     </Layout>
//   );
// };

// export default SignIn;
