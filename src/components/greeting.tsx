import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Row, Col, Card, CardColumns, Badge } from "react-bootstrap";
import { encrypt, decrypt } from "../helpers/helpers";

const Greetings = (): JSX.Element => {
  const user = useSelector((state) => state.authReducer.username);
  console.log(user);
  const userid = encrypt(user);
  console.log(userid);
  console.log(decrypt(userid));

  const [data, setData] = useState([]);
  const getData = () => {
    fetch(`http://localhost:5000/v1/user/${userid}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setData(myJson);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  const Allpolls = (): any => {
    return data && data.length > 0 ? (
      data.map((item) => (
        <Card border="dark" className="p-2">
          <Card.Title className="text-center">
            {item.title}
            <Badge variant={item.open ? "success" : "danger"} className="ml-1">
              {item.open ? "open" : "closed"}
            </Badge>
          </Card.Title>
          <Card.Body className="text-center">
            {item.description}
            <a href={`/poll/${item._id}`} className="stretched-link"></a>
          </Card.Body>
        </Card>
      ))
    ) : (
      <br />
    );
  };

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

      <Row className="mt-2">
        <Col>
          <h4>Your Polls </h4>
        </Col>
      </Row>

      <div className="my-2">
        {data && data.length > 0 ? (
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
    </div>
  );
};
export default Greetings;
