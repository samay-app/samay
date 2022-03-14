import { Button, Spinner } from "react-bootstrap";
import { useState, Dispatch } from "react";
import Router from "next/router";
import { markFinalChoice } from "../../utils/api/server";
import { Choice } from "../../models/poll";
import { encrypt } from "../../helpers";

const SubmitFinalChoice = (props: {
  finalChoice: Choice | undefined;
  pollID: string;
  secret: string;
  setResponse: Dispatch<{
    status: boolean;
    msg: string;
  }>;
}): JSX.Element => {
  const { finalChoice, pollID, secret, setResponse } = props;

  const [disabled, setDisabled] = useState<boolean>(false);

  const handleSubmit = async (
    e: React.MouseEvent<HTMLInputElement>
  ): Promise<void> => {
    e.preventDefault();
    if (finalChoice) {
      setDisabled(true);
      try {
        const voterArgs = {
          finalChoice: {
            finalChoice,
            open: false,
          },
          pollID,
          secret: encrypt(secret),
        };
        const submitFinalChoiceResponse = await markFinalChoice(voterArgs);
        if (submitFinalChoiceResponse.statusCode === 201) {
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
          msg: "Network error. Please try again later.",
        });
        Router.reload();
      }
    } else {
      setResponse({
        status: true,
        msg: "Please choose the final time.",
      });
    }
  };

  return (
    <div>
      <Button
        className="rm-primary-button mark-final-time-btn"
        type="submit"
        disabled={disabled}
        onClick={handleSubmit}
      >
        {!disabled ? (
          `Mark final time`
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

export default SubmitFinalChoice;
