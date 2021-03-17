import { Button, Spinner } from "react-bootstrap";
import { useState } from "react";
import Router from "next/router";
import { useSelector } from "react-redux";
import { markChoices } from "../../utils/api/server";
import { Vote, RocketMeetPollFromDB, MailerArgs } from "../../models/poll";
import ResponseMessage from "../ResponseMessage";
import { decrypt } from "../../helpers/helpers";
import { sendPollResponse } from "../../utils/api/mailer";
import { RootState } from "../../store/store";

const SubmitChoices = (props: {
  newVote: Vote;
  pollID: string;
  pollFromDB: RocketMeetPollFromDB;
}): JSX.Element => {
  const { newVote, pollID, pollFromDB } = props;
  const pollCreatorEmailID = decrypt(pollFromDB.encryptedEmailID);
  const token = useSelector((state: RootState) => state.authReducer.token);
  const isLoggedIn = useSelector(
    (state: RootState) => state.authReducer.isLoggedIn
  );
  const senderEmailID = useSelector(
    (state: RootState) => state.authReducer.username
  );

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
          pollID,
        };
        const submitChoiceResponse = await markChoices(voterArgs);
        if (submitChoiceResponse.statusCode === 201) {
          if (isLoggedIn) {
            const mailerArgs: MailerArgs = {
              pollID,
              senderEmailID,
              pollTitle: pollFromDB.title,
              receiverIDs: Array<string>(pollCreatorEmailID),
              senderName: newVote.name,
            };
            sendPollResponse(mailerArgs, token);
          }
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
