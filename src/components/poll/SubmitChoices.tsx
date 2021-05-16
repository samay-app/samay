import { Button, Spinner } from "react-bootstrap";
import { useState } from "react";
import Router from "next/router";
import { useSelector } from "react-redux";
import {
  markChoicesProtected,
  markChoicesPublic,
} from "../../utils/api/server";
import { Vote, RocketMeetPollFromDB } from "../../models/poll";
import ResponseMessage from "../ResponseMessage";
import { RootState } from "../../store/store";
import { isUserPresentInVotes } from "../../helpers/helpers";

const SubmitChoices = (props: {
  newVote: Vote;
  pollID: string;
  pollFromDB: RocketMeetPollFromDB;
}): JSX.Element => {
  const { newVote, pollID, pollFromDB } = props;
  const pollType = pollFromDB.type;
  const token = useSelector((state: RootState) => state.authReducer.token);
  const isLoggedIn = useSelector(
    (state: RootState) => state.authReducer.isLoggedIn
  );
  const [response, setResponse] = useState({
    status: false,
    type: "",
    msg: "",
  });
  const [disabled, setDisabled] = useState<boolean>(false);

  let btnHidden = false;
  if (
    pollType === "protected" &&
    isLoggedIn &&
    pollFromDB.votes &&
    isUserPresentInVotes(newVote.name, pollFromDB.votes)
  ) {
    btnHidden = true;
  }
  if (pollType === "protected" && !isLoggedIn) {
    btnHidden = true;
  }

  const handleSubmit = async (
    e: React.MouseEvent<HTMLInputElement>
  ): Promise<void> => {
    e.preventDefault();
    if (pollType === "protected" && !isLoggedIn) {
      setResponse({
        status: true,
        type: "error",
        msg: "Poll is protected. Please login first.",
      });
    } else if (newVote.name && newVote.choices.length > 0) {
      setDisabled(true);
      try {
        let submitChoiceResponse;
        if (pollType === "public") {
          const voterArgs = {
            newVote,
            pollID,
          };
          submitChoiceResponse = await markChoicesPublic(voterArgs);
        } else {
          const voterArgs = {
            newVote,
            pollID,
            token,
          };
          submitChoiceResponse = await markChoicesProtected(voterArgs);
        }
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
