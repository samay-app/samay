import { Container, Row, Col, Button } from "react-bootstrap";
import Layout from "../src/components/layout";

const Home = (): JSX.Element => {
  return (
    <Layout>
      <div className="herol">
        <Container>
          <Row>
            <Col className="col-12 col-xl-6 d-flex flex-column justify-content-center">
              <div className="text-left my-3 ">
                <h2>
                  It shouldn’t take 30 emails to schedule a 30-minute meeting
                </h2>
                <h3>Launch polls, schedule smart</h3>
                <Button
                  className="ctl-button"
                  variant="outline-primary"
                  size="lg"
                  href="/poll/create"
                >
                  Create a poll
                </Button>
              </div>
            </Col>
            <Col className="hero col-12 col-xl-6" />
          </Row>
        </Container>
      </div>
    </Layout>
  );
};

export default Home;
