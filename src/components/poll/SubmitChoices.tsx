import { Button, Spinner } from "react-bootstrap";
import { useState } from "react";
import Router from "next/router";
import { markChoices } from "../../utils/api/server";
import { Vote, PollFromDB } from "../../models/poll";
import ResponseMessage from "../ResponseMessage";
import { isUserPresentInVotes } from "../../helpers";

const SubmitChoices = (props: {
  newVote: Vote;
  pollID: string;
  pollFromDB: PollFromDB;
}): JSX.Element => {
  const { newVote, pollID, pollFromDB } = props;

  const [response, setResponse] = useState({
    status: false,
    type: "",
    msg: "",
  });
  const [disabled, setDisabled] = useState<boolean>(false);

  let btnHidden = false;
  if (
    pollFromDB.votes &&
    isUserPresentInVotes(newVote.name, pollFromDB.votes)
  ) {
    btnHidden = true;
  }
  const handleSubmit = async (
    e: React.MouseEvent<HTMLInputElement>
  ): Promise<void> => {
    e.preventDefault();
    if (newVote.name && newVote.choices.length > 0) {
      setDisabled(true);
      try {
        let submitChoiceResponse;
        const voterArgs = {
          newVote,
          pollID,
        };
        submitChoiceResponse = await markChoices(voterArgs);
        if (submitChoiceResponse && submitChoiceResponse.statusCode === 201) {
          Router.reload();
        } else if (
          submitChoiceResponse &&
          submitChoiceResponse.statusCode === 400
        ) {
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
        className="rm-primary-button mark-options-btn"
        type="submit"
        disabled={disabled}
        onClick={handleSubmit}
        hidden={btnHidden}
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
              className="rm-button-spinner"
            />
          </>
        )}
      </Button>
      <ResponseMessage response={response} setResponse={setResponse} />
    </div>
  );
};

export default SubmitChoices;
