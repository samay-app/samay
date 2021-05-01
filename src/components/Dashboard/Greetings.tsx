import React from "react";
import { useSelector } from "react-redux";
import { Button, Row, Col } from "react-bootstrap";
import { RootState } from "../../store/store";

const Greetings = (): JSX.Element => {
  const displayName: string = useSelector(
    (state: RootState) => state.authReducer.displayName
  );
  return (
    <Row className="hero-row">
      <Col sm>
        <h1 className="greeting">Welcome {displayName.split(" ")[0]}!</h1>
      </Col>
      <Col sm>
        <Button className="rm-primary-button dashboard-btn" href="/poll/create">
          Create a poll
        </Button>
      </Col>
    </Row>
  );
};
export default Greetings;
