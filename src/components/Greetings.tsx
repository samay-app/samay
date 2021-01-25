import React from "react";
import { useSelector } from "react-redux";
import { Button, Row, Col, Card } from "react-bootstrap";
import { RootState } from "src/store/store";

const Greetings = (): JSX.Element => {
  const displayName = useSelector((state: RootState) => state.authReducer.displayName);
  const displayMail = useSelector((state: RootState) => state.authReducer.username);
  return (
    <div id="maingreeting" className="py-3 my-1 ">
      <Row className="py-2">
        <Col className="d-flex flex-row  mb-2">
          <div className="rounded-circle profile-pic m-1">
            {displayName.charAt(0)}
          </div>
          <div className="ml-3">
            <span className="profile-user">{displayName}</span>
            <br />
            <span>{displayMail}</span>
          </div>
        </Col>
        <Col className="col-3 d-flex flex-column align-items-center">
          <Button
            className="rm-primary-button mt-2 font-weight-bold"
            href="/poll/create"
          >
            <span className="show-dsk">Create Poll</span>
            <span className="show-mob">+</span>
          </Button>
        </Col>
      </Row>
    </div>
  );
};
export default Greetings;
