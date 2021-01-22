import { Container, Row, Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import Login from "../src/components/Login";
import Layout from "../src/components/Layout";
import { RootState } from "src/store/store";

const Home = (): JSX.Element => {
  const isLoggedIn = useSelector((state: RootState) => state.authReducer.isLoggedIn);

  return (
    <Layout>
      <Container className="outer-container" fluid>
        <Row className="inner-container">
          <Col>
            <div className="text-left my-5">
              <h2 className="hero-title">
                <span className="hero-line">
                  Scheduling meetings{" "}
                  <span className="hero-strikethrough">is boring</span>
                </span>
                <span className="hero-line">has never been faster</span>
              </h2>
              <h3 className="hero-desc">
                <span className="hero-line">
                  Quickly find the best time for team meetings and one-on-ones
                  with
                </span>
                <span className="hero-line">
                  RocketMeet — a free and open source meeting scheduling app
                </span>
              </h3>
              {isLoggedIn ? (
                <Button className="rm-primary-button" href="/poll/create">
                  Create a Poll
                </Button>
              ) : (
                  <Login />
                )}
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Home;
