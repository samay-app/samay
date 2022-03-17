import Router from "next/router";
import { nanoid } from "nanoid";
import {
  Form,
  Row,
  Col,
  Container,
  Jumbotron,
  Button,
  Spinner,
} from "react-bootstrap";
import { ArrowRightShort, ArrowRight } from "react-bootstrap-icons";
import { useState } from "react";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";
import TimePicker from "../src/components/TimePicker";
import { encrypt } from "../src/helpers";
import Layout from "../src/components/Layout";
import ResponseMessage from "../src/components/ResponseMessage";
import { Time, Poll } from "../src/models/poll";
import { createPoll } from "../src/utils/api/server";

const Home = (): JSX.Element => {
  const [pollTitle, setTitle] = useState<string>("");
  const [pollLocation, setLocation] = useState<string>("");
  const [pollDescription, setDescription] = useState<string>("");
  const [pollTimes, setPollTimes] = useState<Time[]>([]);
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

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setTitle(value);
  };

  const handleLocationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = e.target;
    setLocation(value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = e.target;
    setDescription(value);
  };

  const areTimesValid = (times: Time[] | undefined): boolean => {
    if (!times) return false;
    if (times.some((time: Time) => time.start < Date.now() / 1000))
      return false;
    return true;
  };

  let showHero = true;

  if (typeof window !== "undefined") {
    showHero = localStorage.heroShowed !== "true";
  }

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
    if (!pollTimes || (pollTimes && pollTimes?.length < 2)) {
      setResponse({
        status: true,
        msg:
          "Please select at least two time slots for invitees to choose from.",
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

    const secret = nanoid(10);

    const poll: Poll = {
      title: pollTitle,
      description: pollDescription,
      location: pollLocation,
      secret: encrypt(secret),
      times: pollTimes,
    };

    try {
      setDisabled(true);

      const createPollResponse = await createPoll({
        poll,
      });

      if (createPollResponse.statusCode === 201) {
        if (typeof window !== "undefined") {
          localStorage.setItem(`${createPollResponse.data._id}`, "creator");

          if (localStorage.heroShowed !== "true") {
            localStorage.setItem("heroShowed", "true");
          }
        }
        Router.push(`/poll/${createPollResponse.data._id}/${secret}`);
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

  return (
    <Layout>
      {showHero && (
        <Container>
          <Row className="home-hero-row">
            <Col className="home-hero-col">
              <span className="hero-title">
                Never ask “what time works for you all?” again.
              </span>
              <span className="hero-secondary-desc">
                Create a poll <ArrowRight /> Share the poll <ArrowRight /> Wait
                for invitees <ArrowRight /> Decide the time <ArrowRight /> Share
                the time.
              </span>
              <span className="hero-tagline">
                Free, fast and open source.
                <span
                  className="hero-tour"
                  aria-hidden="true"
                  onClick={handleStartTour}
                >
                  Go on a quick tour
                  <ArrowRightShort className="tour-start-icon" />
                </span>
              </span>
            </Col>
          </Row>
        </Container>
      )}
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
            <Jumbotron className="poll-create">
              <Form.Group as={Row} controlId="formPlainTextTitle">
                <Form.Control
                  className="kukkee-form-text"
                  type="text"
                  placeholder="Title"
                  required
                  onChange={handleTitleChange}
                />
              </Form.Group>
              <Form.Group as={Row} controlId="formPlainTextDescription">
                <Form.Control
                  className="kukkee-form-text"
                  type="text"
                  placeholder="Description (optional)"
                  onChange={handleDescriptionChange}
                />
              </Form.Group>
              <Form.Group as={Row} controlId="formPlainTextLocation">
                <Form.Control
                  className="kukkee-form-text"
                  type="text"
                  placeholder="Location (optional)"
                  onChange={handleLocationChange}
                />
              </Form.Group>
            </Jumbotron>
          </Col>
        </Row>
        <Row className="jumbo-row">
          <Col className="jumbo-col">
            <Jumbotron className="poll-timeslot-jumbo">
              <TimePicker pollTimes={pollTimes} setPollTimes={setPollTimes} />
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

export default Home;
