import { Button, Spinner } from "react-bootstrap";
import { useState, Dispatch } from "react";
import Router from "next/router";
import { markFinalTime } from "../../utils/api/server";
import { Time } from "../../models/poll";

const SubmitFinalTime = (props: {
  finalTime: Time | undefined;
  pollID: string;
  setResponse: Dispatch<{
    status: boolean;
    msg: string;
  }>;
}): JSX.Element => {
  const { finalTime, pollID, setResponse } = props;

  const [disabled, setDisabled] = useState<boolean>(false);

  const handleSubmit = async (
    e: React.MouseEvent<HTMLInputElement>
  ): Promise<void> => {
    e.preventDefault();
    if (finalTime) {
      setDisabled(true);
      try {
        const voterArgs = {
          finalTime: {
            finalTime,
            open: false,
          },
          pollID,
        };
        const submitFinalTimeResponse = await markFinalTime(voterArgs);
        if (submitFinalTimeResponse.statusCode === 201) {
          setResponse({
            status: true,
            msg: "Time has been finalised and the poll has been closed",
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
        className="kukkee-primary-button mark-final-time-btn"
        type="submit"
        disabled={disabled}
        onClick={handleSubmit}
      >
        {!disabled ? (
          `Finalise time`
        ) : (
          <>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              className="kukkee-button-spinner"
            />
          </>
        )}
      </Button>
    </div>
  );
};

export default SubmitFinalTime;
