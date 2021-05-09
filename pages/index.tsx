import {
  Container,
  Row,
  Col,
  Jumbotron,
  Button,
  CardDeck,
  Card,
} from "react-bootstrap";
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
            <span className="hero-title">
              Scheduling meetings{" "}
              <span className="hero-strikethrough">is boring</span> has never
              been faster
            </span>
            <span className="hero-desc">
              Quickly find the best time for team meetings and one-on-ones with{" "}
              RocketMeet — a free and open source meeting scheduling tool
            </span>
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
              className="illustration-home"
              alt="illustration-home"
            />
          </Col>
        </Row>
      </Container>
      <Jumbotron className="home-first-jumbo" fluid>
        <Container>
          <img
            src="/screenshot.png"
            className="illustration-home-two"
            alt="illustration-home"
          />
        </Container>
      </Jumbotron>
      <Container className="hero-secondary-container">
        <span className="hero-secondary-title">
          No more back-and-forth emails. Just four simple steps.
        </span>
        <span className="hero-secondary-desc">
          Create a poll → Share the poll → Wait for invitees → Decide the time.
        </span>
      </Container>
      <Jumbotron className="home-second-jumbo" fluid id="features">
        <Container>
          <span className="hero-secondary-title">
            Polls that meet your needs.
          </span>
          <CardDeck>
            <Card className="features-card">
              <Card.Body>
                <Card.Title>Public</Card.Title>
                <Card.Text>
                  Anyone with the poll link can mark their availability. No
                  login required. Best for public meetings.
                </Card.Text>
              </Card.Body>
            </Card>
            <Card className="features-card">
              <Card.Body>
                <Card.Title>Protected</Card.Title>
                <Card.Text>
                  Only logged-in users can mark their availability, leaving no
                  space for impersonation.
                </Card.Text>
              </Card.Body>
            </Card>
            <Card className="features-card">
              <Card.Body>
                <Card.Title>Private</Card.Title>
                <Card.Text>
                  Choose who can see your poll and mark their availability.
                  Hidden for everyone else.
                </Card.Text>
              </Card.Body>
              <Card.Footer className="features-card-footer">
                <small>(Coming soon)</small>
              </Card.Footer>
            </Card>
          </CardDeck>
        </Container>
      </Jumbotron>
      <Jumbotron className="home-third-jumbo" fluid>
        <Container>
          <Row>
            <Col sm>
              <span className="hero-secondary-title">
                No more worrying about time zones.
              </span>
              <span className="hero-secondary-desc">
                RocketMeet fluently handles time zones, leaving no space for
                confusion. You see the times in your time zone and participants
                see the times in theirs.
              </span>
            </Col>
            <Col sm>
              <img
                src="/undraw_world_9iqb.svg"
                className="illustration-home-features"
                alt="illustration-home"
              />
            </Col>
          </Row>
        </Container>
      </Jumbotron>
      <Jumbotron className="home-fourth-jumbo" fluid>
        <Container>
          <Row className="home-fourth-jumbo-row">
            <Col sm>
              <img
                src="/undraw_Experts_re_i40h.svg"
                className="illustration-home-features"
                alt="illustration-home"
              />
            </Col>
            <Col sm>
              <span className="hero-secondary-title">
                Make scheduling collaborative.
              </span>
              <span className="hero-secondary-desc">
                Share your availability. Let invitees narrow it down. See who’s
                free - or who can be - with “if need be” votes. Date and time
                set.
                <br />
                (Coming soon)
              </span>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
      <Jumbotron className="home-second-jumbo" fluid>
        <Container>
          <span className="hero-secondary-title">
            Integrate with your favorite service.
          </span>
          <CardDeck>
            <Card className="features-card">
              <Card.Body>
                <img
                  src="/gcal.png"
                  className="icon-features"
                  alt="icon-features"
                />
                <Card.Title>Google Calendar</Card.Title>
                <Card.Text>
                  Create new Google Calendar events automatically and check for
                  busy times.
                </Card.Text>
              </Card.Body>
              <Card.Footer className="features-card-footer">
                <small>(Coming soon)</small>
              </Card.Footer>
            </Card>
            <Card className="features-card">
              <Card.Body>
                <img
                  src="/outlook-cal.png"
                  className="icon-features"
                  alt="icon-features"
                />
                <Card.Title>Outlook Calendar</Card.Title>
                <Card.Text>
                  Automatically create new events in Outlook and check for your
                  busy times.
                </Card.Text>
              </Card.Body>
              <Card.Footer className="features-card-footer">
                <small>(Coming soon)</small>
              </Card.Footer>
            </Card>
            <Card className="features-card">
              <Card.Body>
                <img
                  src="/zoom.png"
                  className="icon-features"
                  alt="icon-features"
                />
                <Card.Title>Zoom</Card.Title>
                <Card.Text>
                  Automatically create Zoom meetings for your invitees after
                  scheduling.
                </Card.Text>
              </Card.Body>
              <Card.Footer className="features-card-footer">
                <small>(Coming soon)</small>
              </Card.Footer>
            </Card>
          </CardDeck>
        </Container>
      </Jumbotron>
      <Jumbotron className="home-fifth-jumbo" fluid>
        <Container>
          <Row>
            <Col sm>
              <span className="hero-secondary-title">
                Ready to start scheduling smart?
              </span>
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
                src="/undraw_Booked_re_vtod.svg"
                className="illustration-cta"
                alt="illustration-cta"
              />
            </Col>
          </Row>
        </Container>
      </Jumbotron>
    </Layout>
  );
};

export default Home;
