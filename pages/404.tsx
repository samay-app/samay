import { Container, Row, Col } from "react-bootstrap";
import Head from "next/head";
import Layout from "../src/components/Layout";

const NotFound = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>404 | Kukkee</title>
        <link rel="shortcut icon" href="/Kukkee-favicon.svg" />
        <meta name="description" content="Kukkee" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Layout>
        <Container className="kukkee-container">
          <Row>
            <Col className="four-o-four">
              <h1>404</h1>
              <p>We can't seem to find the page you're looking for.</p>
            </Col>
          </Row>
        </Container>
      </Layout>
    </>
  );
};

export default NotFound;
