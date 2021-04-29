import { Container, Row, Col, Jumbotron, Button } from "react-bootstrap";
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
      <Container className="rm-container">
        <Row className="home-hero-row">
          <Col className="home-hero-first-col" sm>
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
          <Col sm>
            <img
              src="/undraw_hang_out_h9ud.svg"
              className="illustration"
              alt="Illustration"
            />
          </Col>
        </Row>
      </Container>
      <Jumbotron className="home-second-jumbo" fluid>
        <Container>
          <img
            src="https://d33wubrfki0l68.cloudfront.net/52712975f70951f2ed341b2e17f3a575d6959177/fe6e2/static/dashboard-screen-b294bdd1d718312290ec49b6c2a13428.png"
            className="illustration-two"
            alt="Illustration"
          />
        </Container>
      </Jumbotron>
      <Container className="d-flex justify-content-center">
        <h1 className="hero-secondary-title">
          Scheduling meetings has never been faster
        </h1>
      </Container>
    </Layout>
  );
};

export default Home;
