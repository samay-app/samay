import { Container, Row, Col, CardGroup, Card } from "react-bootstrap";
import Layout from "../src/components/Layout";

const Features = (): JSX.Element => {
  return (
    <Layout>
      <Container className="kukkee-container">
        <Row>
          <Col className="inside-page">
            <h1>Features</h1>
            <CardGroup className="features">
              <Card className="kukkee-card">
                <Card.Body>
                  <Card.Title className="title">Free forever</Card.Title>
                  <Card.Text>
                    No ads, and we will never sell your data. We rely on
                    donations and sponsorships for hosting this tool.
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card className="kukkee-card">
                <Card.Body>
                  <Card.Title className="title">Open Source</Card.Title>
                  <Card.Text>
                    Gives you full access to the code, security assurances, and
                    lets you make or request changes quickly.
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card className="kukkee-card-last">
                <Card.Body>
                  <Card.Title className="title">Fast</Card.Title>
                  <Card.Text>
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
                  <Card.Text>
                    Never ask “what time works for you all?” again. Share your
                    availability through a poll and let invitess narrow it down.
                    See who's free - or who can be - with "if need be" votes.
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card className="kukkee-card">
                <Card.Body>
                  <Card.Title className="title">Self-host</Card.Title>
                  <Card.Text>
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
                  <Card.Text>
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

export default Features;
