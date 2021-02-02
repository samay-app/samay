import { Button, Spinner } from "react-bootstrap";
import { useState } from "react";
import Router from "next/router";
import { serverAPI } from "../api/server";
import { Vote } from "../models/poll";
import ResponseMessage from "./ResponseMessage";

const SubmitChoices = (props: {
  newVote: Vote;
  pollid: string;
}): JSX.Element => {
  const { newVote, pollid } = props;

  const [response, setResponse] = useState({
    status: false,
    type: "",
    msg: "",
  });
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleSubmit = async (
    e: React.MouseEvent<HTMLInputElement>
  ): Promise<void> => {
    e.preventDefault();
    if (newVote.name && newVote.choices.length > 0) {
      setDisabled(true);
      try {
        const voterArgs = {
          newVote,
          pollid,
        };
        const submitChoiceResponse = await serverAPI.markChoices(voterArgs);
        if (submitChoiceResponse.statusCode === 201) {
          Router.reload();
        } else if (submitChoiceResponse.statusCode === 400) {
          setResponse({
            status: true,
            type: "error",
            msg: "Poll has been closed.",
          });
          Router.reload();
        } else {
          setDisabled(false);
          setResponse({
            status: true,
            type: "error",
            msg: "Please try again later.",
          });
          Router.reload();
        }
      } catch (err) {
        setDisabled(false);
        setResponse({
          status: true,
          type: "error",
          msg: "Network error. Please try again later.",
        });
        Router.reload();
      }
    } else if (!newVote.name) {
      setResponse({
        status: true,
        type: "error",
        msg: "Please enter your name.",
      });
    } else {
      setResponse({
        status: true,
        type: "error",
        msg: "Please select at least one available time slot.",
      });
    }
  };

  return (
    <div>
      <Button
        className="rm-primary-button-small mark-options-btn"
        type="submit"
        disabled={disabled}
        onClick={handleSubmit}
      >
        {!disabled ? (
          `Mark your availability`
        ) : (
          <>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          </>
        )}
      </Button>
      <ResponseMessage
        response={response}
        onHide={(): void => {
          setResponse({ status: false, type: "", msg: "" });
        }}
      />
    </div>
  );
};

export default SubmitChoices;
