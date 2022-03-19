import { Row, Col, Container, CardGroup, Card } from "react-bootstrap";
import { ArrowRightShort, ArrowRight } from "react-bootstrap-icons";
import Layout from "../src/components/Layout";

const Home = (): JSX.Element => {
  return (
    <Layout>
      <Container className="kukkee-container">
        <Row className="home-hero-row">
          <Col className="home-hero-col">
            <span className="hero-title">
              Never ask “what time works for you all?” again.
            </span>
            <span className="hero-secondary-desc">
              Create a poll <ArrowRight /> Share the poll <ArrowRight /> Wait
              for invitees <ArrowRight /> Decide the time <ArrowRight /> Share
              the time.
            </span>
            <span className="hero-tagline">
              Free, fast and open source.
              <span className="hero-tour" aria-hidden="true">
                Go on a quick tour
                <ArrowRightShort className="tour-start-icon" />
              </span>
            </span>
          </Col>
        </Row>
      </Container>
      <Container className="kukkee-container">
        <Row>
          <Col className="inside-page">
            <CardGroup className="features">
              <Card className="kukkee-card">
                <Card.Body>
                  <Card.Title className="title">Free forever</Card.Title>
                  <Card.Text className="description">
                    No ads, and we will never sell your data. We rely on
                    donations and sponsorships for hosting this tool.
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card className="kukkee-card">
                <Card.Body>
                  <Card.Title className="title">Open Source</Card.Title>
                  <Card.Text className="description">
                    Gives you full access to the code, security assurances, and
                    lets you make or request changes quickly.
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card className="kukkee-card-last">
                <Card.Body>
                  <Card.Title className="title">Fast</Card.Title>
                  <Card.Text className="description">
                    No login or registration required. Streamlined interace.
                    Finding the best time for team meetings or hanging out with
                    your friends has never been faster.
                  </Card.Text>
                </Card.Body>
              </Card>
            </CardGroup>
            <CardGroup className="features">
              <Card className="kukkee-card">
                <Card.Body>
                  <Card.Title className="title">Collaborative</Card.Title>
                  <Card.Text className="description">
                    Never ask “what time works for you all?” again. Share your
                    availability through a poll and let invitess narrow it down.
                    See who's free - or who can be - with "if need be" votes.
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card className="kukkee-card">
                <Card.Body>
                  <Card.Title className="title">Self-host</Card.Title>
                  <Card.Text className="description">
                    Get your own Kukkee up and running in minutes, and take
                    control of your data, branding, customizations and costs.
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card className="kukkee-card-last">
                <Card.Body>
                  <Card.Title className="title">
                    Integrations (coming soon)
                  </Card.Title>
                  <Card.Text className="description">
                    Automatically schedule Google Calendar, Google Meet, Zoom,
                    etc., events after finalising the time.
                  </Card.Text>
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Home;
