import { Button, Row, Col } from "react-bootstrap";

const Greetings = (): JSX.Element => {
  return (
    <div>
      <div id="maingreeting" className="py-3 my-1">
        <h3>Welcome back, Mr X (replaced by name from auth)</h3>
      </div>
      <Row>
        <Col xs={10}>
          <h5>Your Polls </h5>
        </Col>
        <Col xs={2}>
          <Button size="sm">New </Button>
        </Col>
      </Row>

      <div className="my-2">
        {/* Show the poll titles (preferably in card layout ) here.If No polls created before, Show the next thing */}
        <p>
          You haven't created any polls yet. Start one by clicking the new poll
          button above
        </p>
      </div>
    </div>
  );
};
export default Greetings;
