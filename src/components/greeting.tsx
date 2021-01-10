import React from "react";
import { Button, Row, Col, Card } from "react-bootstrap";
import PollsList from "./pollsList";

const Greetings = (): JSX.Element => {
  return (
    <div className="d-flex flex-column w-100">
      <div id="maingreeting" className="py-3 my-1 ">
        <Card className="ctl">
          <Card.Body>
            <Row className="d-flex justify-content-center align-items-center py-1 pl-2">
              <Col className="col-9 text-center">
                <h3>Find best time for everyone to meet. Launch a poll.</h3>
              </Col>
              <Col className="d-flex justify-content-center align-items-center">
                <Button
                  className="ctl-button"
                  href="/poll/create"
                  style={{ height: "40px" }}
                >
                  <h4>Create Poll</h4>
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
      <PollsList />
    </div>
  );
};
export default Greetings;
