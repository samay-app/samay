import { Button, Spinner } from "react-bootstrap";
import { useState, Dispatch } from "react";
import Router from "next/router";
import { markTimes } from "../../utils/api/server";
import { Vote, PollFromDB } from "../../models/poll";
import { isUserPresentInVotes } from "../../helpers";

const SubmitTimes = (props: {
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

    if (!newVote.username) {
      setResponse({
        status: true,
        msg: "Please enter your name.",
      });
      return;
    }

    if (
      pollFromDB.votes &&
      isUserPresentInVotes(newVote.username, pollFromDB.votes)
    ) {
      setResponse({
        status: true,
        msg: "You cannot vote more than once.",
      });
      return;
    }

    if (newVote.times.length === 0) {
      setResponse({
        status: true,
        msg: "Please select at least one available time slot.",
      });
      return;
    }

    setDisabled(true);
    try {
      let submitTimeResponse;
      const voterArgs = {
        newVote,
        pollID,
      };
      submitTimeResponse = await markTimes(voterArgs);
      if (submitTimeResponse && submitTimeResponse.statusCode === 201) {
        setResponse({
          status: true,
          msg: "Your vote has been successfully recorded.",
        });
        Router.reload();
      } else if (submitTimeResponse && submitTimeResponse.statusCode === 404) {
        setResponse({
          status: true,
          msg: "Poll has been deleted.",
        });
        Router.push("/");
      } else if (submitTimeResponse && submitTimeResponse.statusCode === 400) {
        setResponse({
          status: true,
          msg: "Poll has been closed.",
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
        className="kukkee-primary-button mark-options-btn"
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
              className="form-button-spinner"
            />
          </>
        )}
      </Button>
    </div>
  );
};

export default SubmitTimes;
