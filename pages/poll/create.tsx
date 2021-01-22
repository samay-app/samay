import { useSelector } from "react-redux";
import Router from "next/router";
import dynamic from "next/dynamic";
import {
  Container,
  Form,
  Row,
  Col,
  Jumbotron,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { InfoCircleFill } from "react-bootstrap-icons";
import { useState } from "react";
import Layout from "../../src/components/Layout";
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
        encryptedEmailID,
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
      <Form
        onSubmit={(e): void => {
          e.preventDefault();
        }}
      >
        <Jumbotron className="poll-create">
          <Form.Group
            as={Row}
            controlId="formPlainTextTitle"
            className="poll-create-form-title"
          >
            <Col sm="10">
              <Form.Control
                className="rm-form-text"
                type="text"
                placeholder="Enter the title *"
                required
                onChange={handleTitleChange}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlainTextDescription">
            <Col sm="10">
              <Form.Control
                className="rm-form-text"
                type="text"
                placeholder="Enter the description"
                onChange={handleDescriptionChange}
              />
            </Col>
          </Form.Group>
          <OverlayTrigger
            placement="right"
            overlay={
              <Tooltip id="timezone-info">
                The times are displayed in your time zone. Participants will see
                the times in their time zone.
              </Tooltip>
            }
          >
            <InfoCircleFill className="timezone-info-icon" />
          </OverlayTrigger>
        </Jumbotron>
        <Container className="outer-container" fluid>
          <Row className="inner-container">
            <Col>
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
            </Col>
          </Row>
        </Container>
      </Form>
    </Layout>
  );
};

export default withprivateAuth(Create);
