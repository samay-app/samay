import { useSelector } from "react-redux";
import Router from "next/router";
import dynamic from "next/dynamic";
import {
  Form,
  Row,
  Col,
  Container,
  Jumbotron,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { InfoCircleFill } from "react-bootstrap-icons";
import { useState } from "react";
import Layout from "../../src/components/Layout";
import ResponseMessage from "../../src/components/ResponseMessage";
import { encrypt } from "../../src/helpers/helpers";
import { Choice, RocketMeetPoll } from "../../src/models/poll";
import withprivateAuth from "../../src/utils/privateAuth";
import { RootState } from "../../src/store/store";
import { serverAPI } from "../../src/api/server";

// typings aren't available for react-available-times :(

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AvailableTimes: any = dynamic(() => import("react-available-times"), {
  ssr: false,
});

const Create = (): JSX.Element => {
  const [pollTitle, setTitle] = useState<string>("");
  const [pollDescription, setDescription] = useState<string>("");
  const [pollChoices, setChoices] = useState<Choice[]>();
  const [disabled, setDisabled] = useState<boolean>(false);
  const loggedInUserEmailID = useSelector(
    (state: RootState) => state.authReducer.username
  );
  const token = useSelector((state: RootState) => state.authReducer.token);

  const [response, setResponse] = useState({
    status: false,
    type: "",
    msg: "",
  });

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

  const handleSubmit = async (
    e: React.MouseEvent<HTMLInputElement>
  ): Promise<void> => {
    e.preventDefault();
    if (pollTitle && pollChoices && pollChoices?.length > 1) {
      setDisabled(true);
      const encryptedEmailID = encrypt(loggedInUserEmailID);
      const poll: RocketMeetPoll = {
        title: pollTitle,
        description: pollDescription,
        encryptedEmailID,
        choices: pollChoices,
      };
      const createPollResponse = await serverAPI.createPoll({
        poll,
        token,
      });
      if (createPollResponse.statusCode === 201) {
        Router.push(`/poll/${createPollResponse.data._id}`);
      } else {
        setResponse({
          status: true,
          type: "error",
          msg: "Poll creation failed, please try again later.",
        });
      }
    }
  };

  return (
    <Layout>
      <Container className="rm-poll-container" fluid>
        <Row className="jumbo-row">
          <div className="jumbo-col-black col-sm-4">
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
          </div>
          <div className="col-sm-8">
            <Jumbotron className="poll-timeslot-jumbo">
              <AvailableTimes
                weekStartsOn="monday"
                onChange={onChoicesChange}
                height="28rem"
              />
              <Button
                className="rm-primary-button create-poll-btn"
                onClick={handleSubmit}
                disabled={
                  !pollTitle ||
                  !pollChoices ||
                  pollChoices?.length < 2 ||
                  disabled
                }
              >
                Create Poll
              </Button>
              <ResponseMessage
                response={response}
                onHide={(): void =>
                  setResponse({ status: false, type: "", msg: "" })
                }
              />
            </Jumbotron>
          </div>
        </Row>
      </Container>
    </Layout>
  );
};

export default withprivateAuth(Create);
