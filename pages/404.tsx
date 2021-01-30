import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import Layout from "../src/components/Layout";

const NotFound = (): JSX.Element => {
  return (
    <Layout>
      <Container className="outer-container" fluid>
        <Row className="inner-container">
          <Col>
            <h1>404</h1>
            <h3>We can't seem to find the page you're looking for.</h3>
            <h3>
              But here's the link to our
              <Link href="/">
                <a> homepage!</a>
              </Link>{" "}
              :D
            </h3>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default NotFound;
