import Router from "next/router";
import dynamic from "next/dynamic";
import { nanoid } from "nanoid";
import {
  Form,
  Row,
  Col,
  Container,
  Jumbotron,
  Button,
  Spinner,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { QuestionCircleFill } from "react-bootstrap-icons";
import { useState } from "react";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";
import Layout from "../src/components/Layout";
import ResponseMessage from "../src/components/ResponseMessage";
import { Choice, Poll } from "../src/models/poll";
import { createPoll } from "../src/utils/api/server";

// typings aren't available for react-available-times :(

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AvailableTimes: any = dynamic(() => import("react-available-times"), {
  ssr: false,
});

const Create = (): JSX.Element => {
  const [pollTitle, setTitle] = useState<string>("");
  const [pollLocation, setLocation] = useState<string>("");
  const [pollDescription, setDescription] = useState<string>("");
  const [pollChoices, setChoices] = useState<Choice[]>();
  const [disabled, setDisabled] = useState<boolean>(false);

  const [response, setResponse] = useState({
    status: false,
    type: "",
    msg: "",
  });

  const [tourRun, setTourRun] = useState<boolean>(false);

  // Run automatically for first time users
  if (typeof window !== "undefined") {
    if (localStorage.visited !== "true") {
      localStorage.setItem("visited", "true");
      setTourRun(true);
    }
  }

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
        "Add a location to let your invitees know where this event is going to happen.",
    },
    {
      target: ".rat-AvailableTimes_buttons",
      content:
        "Are you an early planner? Use these buttons to schedule further in future.",
    },
    {
      target: ".rat-Slider_component",
      content:
        "Mark your availability by creating time slots. These will be the choices provided to your invitees in the poll. You see the times in your time zone and participants see the times in theirs.",
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

  const onChoicesChange = (selections: { start: Date; end: Date }[]): void => {
    const newChoices: Choice[] = selections.map(
      (choice): Choice => ({
        start: choice.start.getTime(),
        end: choice.end.getTime(),
      })
    );
    setChoices(newChoices);
  };

  const areChoicesValid = (choices: Choice[] | undefined): boolean => {
    if (!choices) return false;
    if (choices.some((choice: Choice) => choice.start < Date.now()))
      return false;
    return true;
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLInputElement>
  ): Promise<void> => {
    e.preventDefault();
    if (
      pollTitle &&
      pollChoices &&
      pollChoices.length > 1 &&
      areChoicesValid(pollChoices)
    ) {
      setDisabled(true);

      const secret = nanoid(10);

      const poll: Poll = {
        title: pollTitle,
        description: pollDescription,
        location: pollLocation,
        secret,
        choices: pollChoices,
      };

      try {
        const createPollResponse = await createPoll({
          poll,
        });

        if (createPollResponse.statusCode === 201) {
          Router.push(
            `/poll/${createPollResponse.data._id}/${createPollResponse.data.secret}`
          );
        } else {
          setDisabled(false);
          setResponse({
            status: true,
            type: "error",
            msg: "Poll creation failed, please try again later.",
          });
        }
      } catch (err) {
        setDisabled(false);
        setResponse({
          status: true,
          type: "error",
          msg: "Poll creation failed, check your connection.",
        });
      }
    } else if (!pollTitle) {
      setResponse({
        status: true,
        type: "error",
        msg: "Please provide a title.",
      });
    } else if (!areChoicesValid(pollChoices)) {
      setResponse({
        status: true,
        type: "error",
        msg: "Chosen time slots must not be in the past.",
      });
    } else {
      setResponse({
        status: true,
        type: "error",
        msg: "Please select at least two time slots to choose from.",
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
      <Container>
        <Row className="home-hero-row">
          <Col className="home-hero-col">
            <span className="hero-title">
              Never ask “what time works for you all?” again.
            </span>
            <span className="hero-secondary-desc">
              Create a poll → Share the poll → Wait for invitees → Decide the
              time → Share the time.
            </span>
            <span className="hero-desc">
              Finding the best time for team meetings or hanging out with your
              friends has never been faster.
            </span>
          </Col>
        </Row>
      </Container>
      <Joyride
        callback={handleJoyrideCallback}
        steps={tourSteps}
        run={tourRun}
        disableScrolling
        continuous
        showSkipButton
        showProgress
        spotlightClicks
        styles={{
          buttonClose: { visibility: "hidden" },
          options: {
            primaryColor: "#68e4f5",
          },
        }}
      />
      <Container className="rm-container">
        <Row className="jumbo-row">
          <Col className="jumbo-col-black">
            <Jumbotron className="poll-create">
              <Form.Group as={Row} controlId="formPlainTextTitle">
                <Form.Control
                  className="rm-form-text"
                  type="text"
                  placeholder="Title"
                  required
                  onChange={handleTitleChange}
                />
              </Form.Group>
              <Form.Group as={Row} controlId="formPlainTextDescription">
                <Form.Control
                  className="rm-form-text"
                  type="text"
                  placeholder="Description (optional)"
                  onChange={handleDescriptionChange}
                />
              </Form.Group>
              <Form.Group as={Row} controlId="formPlainTextLocation">
                <Form.Control
                  className="rm-form-text"
                  type="text"
                  placeholder="Location (optional)"
                  onChange={handleLocationChange}
                />
              </Form.Group>
              <Row>
                <Col className="rm-form-last-row-col">
                  <OverlayTrigger
                    placement="right"
                    overlay={
                      <Tooltip id="tour-start-info">Start tour!</Tooltip>
                    }
                  >
                    <QuestionCircleFill
                      className="tour-start-icon"
                      onClick={handleStartTour}
                    />
                  </OverlayTrigger>
                </Col>
              </Row>
            </Jumbotron>
          </Col>
        </Row>
        <Row className="jumbo-row">
          <Col className="jumbo-col">
            <Jumbotron className="poll-timeslot-jumbo">
              <AvailableTimes
                weekStartsOn="monday"
                onChange={onChoicesChange}
                height="42rem"
              />
            </Jumbotron>
            <Button
              className="rm-primary-button create-poll-btn"
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
                    className="rm-button-spinner"
                  />
                </>
              )}
            </Button>
            <ResponseMessage
              response={response}
              onHide={(): void =>
                setResponse({ status: false, type: "", msg: "" })
              }
            />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Create;
