import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { encrypt } from "../helpers/helpers";
import { Card, Badge, Row, Col, CardColumns } from "react-bootstrap";
import { RocketMeetPollFromDB } from "@models/poll";
import { RootState } from "src/store/store";

const PollsList = (): JSX.Element => {
  const user = useSelector((state: RootState) => state.authReducer.username);
  const userid = encrypt(user);
  const [pollList, setPollList] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/v1/user/${userid}`);
      const fetchedPolls = await response.json();
      setPollList(fetchedPolls);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const Allpolls = (): any => {
    return pollList.map((item: RocketMeetPollFromDB) => (
      <Card bg="dark" text="white" className="p-4" key={item._id}>
        <Card.Title className="d-flex flex-row justify-content-between">
          <span className="card-title">{item.title}</span>
          <Badge variant={item.open ? "success" : "danger"}>
            {item.open ? "open" : "closed"}
          </Badge>
        </Card.Title>
        <Card.Body className="text-justify">
          <span className="card-bdy">{item.description}</span>
          <a href={`/poll/${item._id}`} className="stretched-link"></a>
        </Card.Body>
      </Card>
    ));
  };
  return (
    <>
      <Row className="mt-2">
        <Col>
          <h3 className="y-polls"> Your Polls </h3>
        </Col>
      </Row>

      <div className="mb-2 mt-3">
        {pollList && pollList.length > 0 ? (
          <CardColumns>
            <Allpolls />
          </CardColumns>
        ) : (
          <p>
            You haven't created any polls yet. Start one by clicking the new
            poll button above
          </p>
        )}
      </div>
    </>
  );
};

export default PollsList;
