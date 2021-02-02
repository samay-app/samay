import { Button, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useState } from "react";
import Router from "next/router";
import { serverAPI } from "../api/server";
import { RootState } from "../store/store";
import { Choice } from "../models/poll";
import ResponseMessage from "./ResponseMessage";

const SubmitFinalChoice = (props: {
  finalChoice: Choice | undefined;
  pollid: string;
}): JSX.Element => {
  const { finalChoice, pollid } = props;

  const [response, setResponse] = useState({
    status: false,
    type: "",
    msg: "",
  });
  const [disabled, setDisabled] = useState<boolean>(false);

  const token = useSelector((state: RootState) => state.authReducer.token);

  const handleSubmit = async (
    e: React.MouseEvent<HTMLInputElement>
  ): Promise<void> => {
    e.preventDefault();
    if (finalChoice) {
      setDisabled(true);
      try {
        const markFinalChoice = {
          finalChoice,
          open: false,
        };
        const voterArgs = {
          finalChoice: markFinalChoice,
          pollid,
          token,
        };
        const submitFinalChoiceResponse = await serverAPI.markFinalChoice(
          voterArgs
        );
        if (submitFinalChoiceResponse.statusCode === 201) {
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
    } else {
      setResponse({
        status: true,
        type: "error",
        msg: "Please choose the final time.",
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
          `Mark final option`
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

export default SubmitFinalChoice;
