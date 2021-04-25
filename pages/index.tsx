import { Container, Row, Col, Button } from "react-bootstrap";
import { FaGithub } from "react-icons/fa";
import { useSelector } from "react-redux";
import Login from "../src/components/Login";
import Layout from "../src/components/Layout";
import { RootState } from "../src/store/store";

const Home = (): JSX.Element => {
  const isLoggedIn = useSelector(
    (state: RootState) => state.authReducer.isLoggedIn
  );

  return (
    <Layout>
      <Container>
        <Row className="hero-row">
          <Col>
            <h1 className="hero-title">
              Scheduling meetings{" "}
              <span className="hero-strikethrough">is boring</span> has never
              been faster
            </h1>
            <h3 className="hero-desc">
              Quickly find the best time for team meetings and one-on-ones with{" "}
              RocketMeet — a free and open source meeting scheduling tool
            </h3>
            <div className="hero-buttons">
              <div className="hero-first-button">
                {isLoggedIn ? (
                  <Button className="rm-primary-button" href="/poll/create">
                    Create a poll
                  </Button>
                ) : (
                  <Login btnStyle="rm-primary-button" />
                )}
              </div>
              <div className="hero-second-button">
                <Button
                  className="rm-secondary-button"
                  href="https://github.com/RocketMeet"
                  target="_blank"
                >
                  <FaGithub /> Use self-hosted version
                </Button>
              </div>
            </div>
          </Col>
          <Col className="d-none d-lg-block">
            <img
              src="/undraw_hang_out_h9ud.svg"
              className="illustration"
              alt="Illustration"
            />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Home;
