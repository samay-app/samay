import Router from "next/router";
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
import { useState } from "react";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";
import { useSession } from "next-auth/react";
import Layout from "../src/components/Layout";
import ResponseMessage from "../src/components/ResponseMessage";
import { Time, Poll } from "../src/models/poll";
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
        query: { from: Router.pathname },
      });
    },
  });

  if (session) console.log(session.username);
  const [pollDetails, setPollDetails] = useState<{
    pollTitle: string;
    pollLocation: string;
    pollDescription: string;
  }>({
    pollTitle: "",
    pollLocation: "",
    pollDescription: "",
  });

  const { pollTitle, pollLocation, pollDescription } = pollDetails;

  const [pollTimes, setTimes] = useState<Time[]>();
  const [disabled, setDisabled] = useState<boolean>(false);

  const [response, setResponse] = useState({
    status: false,
    msg: "",
  });

  const [tourRun, setTourRun] = useState<boolean>(false);

  const tourSteps: Step[] = [
    {
      disableBeacon: true,
      target: "#formPlainTextTitle",
      content: "Give your event the memorable title it deserves.",
    },
    {
      target: "#formPlainTextDescription",
      content:
        "Add a description to let your invitees know what this is all about.",
    },
    {
      target: "#formPlainTextLocation",
      content:
        "Add a location to let your invitees know where this is going to happen.",
    },
    {
      target: ".rat-AvailableTimes_buttons",
      content: "Use these buttons to schedule further in future if needed.",
    },
    {
      target: ".rat-Slider_component",
      content:
        "Mark your availability by selecting time slots. These will be the times provided to your invitees in the poll. You see the times in your time zone and invitees see the times in theirs.",
    },
    {
      target: ".create-poll-btn",
      content: "Click here when you're all done!",
    },
  ];

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

    if (!session) return;

    const poll: Poll = {
      title: pollTitle,
      description: pollDescription,
      location: pollLocation,
      username: session.user.username,
      times: pollTimes,
    };

    try {
      setDisabled(true);

      const createPollResponse = await createPoll({
        poll,
      });

      if (createPollResponse.statusCode === 201) {
        Router.push(`/poll/${createPollResponse.data._id}}`);
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

  const handleStartTour = (): void => {
    setTourRun(true);
  };

  const handleJoyrideCallback = (data: CallBackProps): void => {
    const { status, type } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status) || type === "beacon") {
      setTourRun(false);
    }
  };

  if (!session) return <></>;

  return (
    <Layout>
      <div className="kukkee-main-heading">
        <Container className="kukkee-container">New poll</Container>
      </div>
      <Joyride
        callback={handleJoyrideCallback}
        steps={tourSteps}
        run={tourRun}
        disableScrolling
        continuous
        showProgress
        spotlightClicks
        styles={{
          buttonClose: { visibility: "hidden" },
          options: {
            primaryColor: "#363636",
          },
        }}
      />
      <Container className="kukkee-container">
        <Row className="jumbo-row">
          <Col className="jumbo-col-black">
            <Jumbotron className="kukkee-jumbo">
              <Form.Group as={Row} controlId="pollTitle">
                <Form.Label className="kukkee-form-label text-sm">
                  Title
                </Form.Label>
                <Form.Control
                  className="kukkee-form-text title text-sm"
                  type="text"
                  placeholder="What's it about?"
                  name="pollTitle"
                  onChange={handlePollDetailsChange}
                />
              </Form.Group>
              <Form.Group as={Row} controlId="pollDescription">
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
              <Form.Group as={Row} controlId="pollLocation">
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
  );
};

export default New;
