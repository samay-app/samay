import Router from "next/router";
import Head from "next/head";
import dynamic from "next/dynamic";
import {
  Form,
  Row,
  Col,
  Container,
  Jumbotron,
  Button,
  Spinner,
} from "react-bootstrap";
import { format } from "url";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Layout from "../src/components/Layout";
import ResponseMessage from "../src/components/ResponseMessage";
import { Time, Poll, PollType } from "../src/models/poll";
import { createPoll } from "../src/utils/api/server";

// typings aren't available for react-available-times

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AvailableTimes: any = dynamic(() => import("react-available-times"), {
  ssr: false,
});

const New = (): JSX.Element => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      Router.push({
        pathname: "/auth/signin",
        query: { from: "/new" },
      });
    },
  });

  const [pollDetails, setPollDetails] = useState<{
    pollTitle: string;
    pollLocation: string;
    pollDescription: string;
  }>({
    pollTitle: "",
    pollLocation: "",
    pollDescription: "",
  });

  const [pollType, setPollType] = useState<PollType>("protected");

  const handlePollTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const { value } = e.target;
    const pollTypeFromOptions = value as PollType;
    setPollType(pollTypeFromOptions);
  };

  const { pollTitle, pollLocation, pollDescription } = pollDetails;

  const [pollTimes, setTimes] = useState<Time[]>();
  const [disabled, setDisabled] = useState<boolean>(false);

  const [response, setResponse] = useState({
    status: false,
    msg: "",
  });

  const handlePollDetailsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;

    setPollDetails({
      ...pollDetails,
      [name]: value,
    });
  };

  const onTimesChange = (selections: { start: Date; end: Date }[]): void => {
    const newTimes: Time[] = selections.map(
      (time): Time => ({
        start: time.start.getTime(),
        end: time.end.getTime(),
      })
    );
    setTimes(newTimes);
  };

  const areTimesValid = (times: Time[] | undefined): boolean => {
    if (!times) return false;
    if (times.some((time: Time) => time.start < Date.now())) return false;
    return true;
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLInputElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!pollTitle) {
      setResponse({
        status: true,
        msg: "Please provide a title.",
      });
      return;
    }
    if (!pollTimes || (pollTimes && pollTimes?.length === 0)) {
      setResponse({
        status: true,
        msg: "Please select at least one time slot for invitees.",
      });
      return;
    }
    if (!areTimesValid(pollTimes)) {
      setResponse({
        status: true,
        msg: "Chosen time slots must not be in the past.",
      });
      return;
    }

    if (!session || !session.username) return;

    const poll: Poll = {
      title: pollTitle,
      description: pollDescription,
      location: pollLocation,
      type: pollType,
      username: session.username,
      times: pollTimes,
    };

    try {
      setDisabled(true);

      const createPollResponse = await createPoll({
        poll,
      });

      if (createPollResponse.statusCode === 201) {
        Router.push(
          "/poll/[id]",
          format({ pathname: `/poll/${createPollResponse.data._id}` })
        );
      } else {
        setDisabled(false);
        setResponse({
          status: true,
          msg: "Poll creation failed, please try again later.",
        });
      }
    } catch (err) {
      setDisabled(false);
      setResponse({
        status: true,
        msg: "Poll creation failed, please try again later.",
      });
    }
  };

  if (!session) return <></>;

  return (
    <>
      <Head>
        <title>New poll | Kukkee</title>
        <link rel="shortcut icon" href="/Kukkee-favicon.svg" />
        <meta name="description" content="Kukkee" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Layout>
        <div className="kukkee-main-heading">
          <Container className="kukkee-container">New poll</Container>
        </div>
        <Container className="kukkee-container">
          <Row className="jumbo-row">
            <Col className="jumbo-col-black">
              <Jumbotron className="kukkee-new-poll-jumbo">
                <Form.Group controlId="pollTitle">
                  <Form.Label className="kukkee-form-label text-sm">
                    Title
                  </Form.Label>
                  <Form.Control
                    className="kukkee-form-text title text-sm"
                    type="text"
                    placeholder="What's this about?"
                    name="pollTitle"
                    onChange={handlePollDetailsChange}
                  />
                </Form.Group>
                <Form.Group controlId="pollDescription">
                  <Form.Label className="kukkee-form-label text-sm">
                    Description (optional)
                  </Form.Label>
                  <Form.Control
                    className="kukkee-form-text description text-sm"
                    type="text"
                    name="pollDescription"
                    placeholder="Tell your invitees more about this"
                    onChange={handlePollDetailsChange}
                  />
                </Form.Group>
                <Form.Group controlId="pollLocation">
                  <Form.Label className="kukkee-form-label text-sm">
                    Location (optional)
                  </Form.Label>
                  <Form.Control
                    className="kukkee-form-text location text-sm"
                    type="text"
                    name="pollLocation"
                    placeholder="Where is this going to happen?"
                    onChange={handlePollDetailsChange}
                  />
                </Form.Group>
                <Form.Group controlId="pollType">
                  <Form.Label className="kukkee-form-label text-sm">
                    Poll Type
                  </Form.Label>
                  <Form.Control
                    as="select"
                    className="poll-type"
                    name="pollType"
                    onChange={handlePollTypeChange}
                    defaultValue="protected"
                  >
                    <option value="protected">Protected</option>
                    <option value="public">Public</option>
                  </Form.Control>
                </Form.Group>
              </Jumbotron>
            </Col>
          </Row>
          <Row className="jumbo-row">
            <Col className="jumbo-col">
              <Jumbotron className="poll-timeslot-jumbo">
                <AvailableTimes
                  weekStartsOn="monday"
                  onChange={onTimesChange}
                  height="42rem"
                />
              </Jumbotron>
              <Button
                className="kukkee-primary-button create-poll-btn"
                onClick={handleSubmit}
                disabled={disabled}
              >
                {!disabled ? (
                  `Create poll`
                ) : (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="kukkee-button-spinner"
                    />
                  </>
                )}
              </Button>
              <ResponseMessage response={response} setResponse={setResponse} />
            </Col>
          </Row>
        </Container>
      </Layout>
    </>
  );
};

export default New;
