import React from "react";
import { useSelector } from "react-redux";
import { Button, Row } from "react-bootstrap";
import { RootState } from "../../store/store";

const Greetings = (): JSX.Element => {
  const displayName: string = useSelector(
    (state: RootState) => state.authReducer.displayName
  );
  return (
    <Row className="greetings">
      <div className="col-sm-8">
        <span className="profile-user">
          Welcome {displayName.split(" ")[0]}!
        </span>
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
