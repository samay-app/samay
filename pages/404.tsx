import { Container, Row, Col } from "react-bootstrap";
import Layout from "../src/components/Layout";

const NotFound = (): JSX.Element => {
  return (
    <Layout>
      <Container className="kukkee-container">
        <Row>
          <Col className="four-o-four">
            <h1>404</h1>
            <p>
              We can't seem to find the page you're looking for.
              <br />
              But{" "}
              <a
                href="https://www.youtube.com/watch?v=sYmQQn_ZSys"
                target="_blank"
                rel="noreferrer"
              >
                here
              </a>
              's a rocket landing.
            </p>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default NotFound;
