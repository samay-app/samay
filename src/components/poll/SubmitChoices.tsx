import { Button, Spinner } from "react-bootstrap";
import { useState, Dispatch } from "react";
import Router from "next/router";
import { markChoices } from "../../utils/api/server";
import { Vote, PollFromDB } from "../../models/poll";
import { isUserPresentInVotes } from "../../helpers";

const SubmitChoices = (props: {
  newVote: Vote;
  pollID: string;
  pollFromDB: PollFromDB;
  setResponse: Dispatch<{
    status: boolean;
    msg: string;
  }>;
}): JSX.Element => {
  const { newVote, pollID, pollFromDB, setResponse } = props;

  const [disabled, setDisabled] = useState<boolean>(false);

  const handleSubmit = async (
    e: React.MouseEvent<HTMLInputElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!newVote.name) {
      setResponse({
        status: true,
        msg: "Please enter your name.",
      });
      return;
    }

    if (
      pollFromDB.votes &&
      isUserPresentInVotes(newVote.name, pollFromDB.votes)
    ) {
      setResponse({
        status: true,
        msg: "An invitee with the same name has voted before.",
      });
      return;
    }

    if (newVote.choices.length === 0) {
      setResponse({
        status: true,
        msg: "Please select at least one available time slot.",
      });
      return;
    }

    setDisabled(true);
    try {
      let submitChoiceResponse;
      const voterArgs = {
        newVote,
        pollID,
      };
      submitChoiceResponse = await markChoices(voterArgs);
      if (submitChoiceResponse && submitChoiceResponse.statusCode === 201) {
        setResponse({
          status: true,
          msg: "Your vote has been successfully recorded.",
        });
        Router.reload();
      } else if (
        submitChoiceResponse &&
        submitChoiceResponse.statusCode === 400
      ) {
        setResponse({
          status: true,
          msg: "Sorry, poll has been closed.",
        });
        Router.reload();
      } else {
        setDisabled(false);
        setResponse({
          status: true,
          msg: "Please try again later.",
        });
        Router.reload();
      }
    } catch (err) {
      setDisabled(false);
      setResponse({
        status: true,
        msg: "Please try again later.",
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
    </div>
  );
};

export default SubmitChoices;
