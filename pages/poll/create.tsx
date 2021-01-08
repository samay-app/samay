import { useSelector } from "react-redux";
import Router from "next/router";
import dynamic from "next/dynamic";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useState } from "react";
import Layout from "../../src/components/layout";
import { encrypt } from "../../src/helpers/helpers";
import { Choice, RocketMeetPoll } from "../../src/models/poll";
import withprivateAuth from "../../src/utils/privateAuth";
import { RootState } from "../../src/store/store";

// typings aren't available for react-available-times :(

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AvailableTimes: any = dynamic(() => import("react-available-times"), {
  ssr: false,
});

const Create = (): JSX.Element => {
  const [pollTitle, setTitle] = useState<string>("");
  const [pollDescription, setDescription] = useState<string>("");
  const [pollChoices, setChoices] = useState<Choice[]>();
  const loggedInUserEmailID = useSelector(
    (state: RootState) => state.authReducer.username
  );

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
    if (pollTitle && pollChoices && pollChoices?.length > 0) {
      const encryptedEmailID = encrypt(loggedInUserEmailID);
      const poll: RocketMeetPoll = {
        title: pollTitle,
        description: pollDescription,
        emailID: encryptedEmailID,
        choices: pollChoices,
      };
      const payload = JSON.stringify(poll);
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: payload,
      };
      fetch(`http://localhost:5000/v1/user/poll`, requestOptions)
        .then((res) => {
          if (res.status === 201) {
            res.json().then((data) => {
              Router.push(`/poll/${data._id}`);
            });
          } else {
            console.log("Poll creation failed! Please try again");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <Layout>
      <Container className="outer-container" fluid>
        <Row>
          <Col>
            <h1>Create a poll</h1>
            <Form
              className="p-3"
              onSubmit={(e): void => {
                e.preventDefault();
              }}
            >
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
                className="mt-4 float-right"
                variant="primary"
                onClick={handleSubmit}
                disabled={
                  !pollTitle || !pollChoices || pollChoices?.length === 0
                }
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
