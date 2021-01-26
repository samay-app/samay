import { useSelector } from "react-redux";
import Router from "next/router";
import dynamic from "next/dynamic";
import {
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
import { ServerAPI } from "@api/server";

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
  const token = useSelector((state: RootState) => state.authReducer.token)
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

  const handleSubmit = async (): Promise<void> => {
    if (pollTitle && pollChoices && pollChoices?.length > 0) {
      const encryptedEmailID = encrypt(loggedInUserEmailID);
      const poll: RocketMeetPoll = {
        title: pollTitle,
        description: pollDescription,
        encryptedEmailID,
        choices: pollChoices,
      };
      const createPollResponse = await ServerAPI.createPoll({
        poll,
        token
      });
      if (createPollResponse.statusCode === 201) {
        Router.push(`/poll/${createPollResponse.data._id}`);
      } else {
        console.log("Poll creation failed! Please try again");
      }
    }
  }

  return (
    <Layout>
      <Form
        onSubmit={(e): void => {
          e.preventDefault();
        }}
      >
        <Row className="jumbo-row">
          <Col className="jumbo-col-create col-lg-4">
            <Jumbotron className="poll-create">
              <Form.Group as={Row} controlId="formPlainTextTitle">
                <Col>
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
                <Col>
                  <Form.Control
                    className="rm-form-desc"
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
                    The times are displayed in your time zone. Participants will
                    see the times in their time zone.
                  </Tooltip>
                }
              >
                <InfoCircleFill className="timezone-info-icon" />
              </OverlayTrigger>
            </Jumbotron>
          </Col>
          <Col className="jumbo-col create-col col-lg-8">
            <Jumbotron className="poll-table-jumbo">
              <AvailableTimes
                weekStartsOn="monday"
                onChange={onChoicesChange}
                height={500}
              />
              <Button
                className="rm-primary-button create-poll-btn"
                onClick={handleSubmit}
                disabled={
                  !pollTitle || !pollChoices || pollChoices?.length === 0
                }
              >
                Create Poll
              </Button>
            </Jumbotron>
          </Col>
        </Row>
      </Form>
    </Layout>
  );
};

export default withprivateAuth(Create);
