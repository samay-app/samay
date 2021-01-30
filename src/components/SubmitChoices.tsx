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
    setDisabled(true);
    const voterArgs = {
      newVote,
      pollid,
    };
    const submitChoiceResponse = await serverAPI.markChoices(voterArgs);
    if (submitChoiceResponse.statusCode === 201) {
      Router.reload();
    } else {
      setResponse({
        status: true,
        type: "error",
        msg: `${JSON.stringify(submitChoiceResponse.data.message)}`,
      });
    }
  };

  return (
    <div>
      <Button
        className="rm-primary-button-small mark-options-btn"
        type="submit"
        disabled={!newVote.name || newVote.choices.length === 0 || disabled}
        onClick={handleSubmit}
      >
        {!disabled ? (
          `Mark your availability`
        ) : (
          <>
            <Spinner as="span" animation="grow" size="sm" />
            &nbsp;Loading...
          </>
        )}
      </Button>
      <ResponseMessage
        response={response}
        onHide={(): void => {
          setResponse({ status: false, type: "", msg: "" });
          Router.reload();
        }}
      />
    </div>
  );
};

export default SubmitChoices;
