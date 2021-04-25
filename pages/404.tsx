import { Container, Row, Col } from "react-bootstrap";
import Layout from "../src/components/Layout";

const NotFound = (): JSX.Element => {
  return (
    <Layout>
      <Container>
        <Row>
          <Col className="four-o-four">
            <span>404</span>
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
