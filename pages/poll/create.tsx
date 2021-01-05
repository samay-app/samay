import dynamic from "next/dynamic";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useState } from "react";
import Layout from "../../src/components/layout";
import { Choice, Poll } from "../../src/models/poll";
import withprivateAuth from "../../src/utils/privateAuth";
import { useSelector } from "react-redux";
import Router from "next/router";

// typings aren't available for react-available-times :(

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AvailableTimes: any = dynamic(() => import("react-available-times"), {
  ssr: false,
});

const Create = (): JSX.Element => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [choices, setChoices] = useState<Choice[]>();
  const currentLoggedInUserID = useSelector((state) => state.authReducer.username);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setTitle(value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = e.target;
    setDescription(value);
  };

  const onChoicesChange = (selections: { start: Date; end: Date }[]): void => {
    const newChoices: Choice[] = selections.map(
      (choice): Choice => ({
        start: choice.start.getTime(),
        end: choice.end.getTime(),
      })
    );
    setChoices(newChoices);
  };

  const handleSubmit = (): void => {
    if (title && choices && choices?.length > 0) {
      const poll: RocketMeetPoll = {
        title: title,
        description: description,
        userID: currentLoggedInUserID,
        choices: choices,
      };
      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      }
      // TODO : Add authorisation header 
      // headers["Authorization"] = "Bearer " + getIdToken();

      // POST poll at v1/user/poll
      const payload = JSON.stringify(poll);

      const requestOptions = {
        method: "POST",
        headers: headers,
        body: payload
      };

      console.log(poll)
      console.log(payload)
      fetch(`http://localhost:5000/v1/user/poll`, requestOptions)
        .then((res) => {
          if (res.status === 201) {
            res.json()
              .then((data) => {
                console.log(data)
                Router.push("/poll/" + data._id)
              })
          } else {
            alert("Poll creation failed! Please try again")
          }
        })
        .catch((err) => console.log(err))
    }
  };

  return (
    <Layout>
      <Container fluid>
        <Row>
          <Col>
            <h1>Create a poll</h1>
            <Form className="p-3" onSubmit={(e) => { e.preventDefault() && false }}>
              <Form.Group as={Row} controlId="formPlainTextTitle">
                <Form.Label column sm="2">
                  Title<span className="imp-star">{" *"}</span>
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="Enter the title"
                    required
                    onChange={handleTitleChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formPlainTextDescription">
                <Form.Label column sm="2">
                  Description
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="Enter the description"
                    onChange={handleDescriptionChange}
                  />
                </Col>
              </Form.Group>
              <AvailableTimes
                weekStartsOn="monday"
                onChange={onChoicesChange}
                height={500}
              />
              <Button
                className="mt-2"
                variant="primary"
                onClick={handleSubmit}
                disabled={!title || !choices || choices?.length === 0}
              >
                Create Poll
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default withprivateAuth(Create);
