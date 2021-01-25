import { Button } from "react-bootstrap";
import Router from "next/router";
import { Choice } from "../models/poll";
import { ServerAPI } from "src/api/server"

const SubmitFinalChoice = (props: {
  finalChoice: Choice | undefined;
  pollid: string;
}): JSX.Element => {
  const { finalChoice, pollid } = props;

  const handleSubmit = async (): Promise<void> => {
    const markFinalChoice = {
      finalChoice,
      open: false,
    };
    const voterArgs = {
      finalChoice: markFinalChoice,
      pollid: pollid
    }
    const submitFinalChoiceResponse = await ServerAPI.markFinalChoice(voterArgs);
    if (submitFinalChoiceResponse.statusCode === 201) {
      Router.reload();
    } else {
      console.log(submitFinalChoiceResponse);
    }
  };

  return (
    <Button
      className="mt-4 mb-4 rm-primary-button-small mark-options-btn"
      type="submit"
      disabled={!finalChoice}
      onClick={handleSubmit}
    >
      Mark final option
    </Button>
  );
};

export default SubmitFinalChoice;
