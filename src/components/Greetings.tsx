import React from "react";
import { useSelector } from "react-redux";
import { Button, Row } from "react-bootstrap";
import { RootState } from "../store/store";

const Greetings = (): JSX.Element => {
  const displayName = useSelector(
    (state: RootState) => state.authReducer.displayName
  );
  return (
    <Row className="inner-container greetings">
      <div className="col-sm-8">
        <span className="profile-user">Welcome {displayName}!</span>
      </div>
      <div className="col-sm-4">
        <Button className="rm-primary-button dashboard-btn" href="/poll/create">
          Create a Poll
        </Button>
      </div>
    </Row>
  );
};
export default Greetings;
