import { Button } from "react-bootstrap";
import { Choice } from "../models/poll";

const SubmitFinalChoice = (props: {
  finalChoice: Choice | undefined;
}): JSX.Element => {
  const { finalChoice } = props;

  const handleSubmit = (): void => {
    const markFinalChoice = {
      finalChoice,
      open: false,
    };
    // PUT markFinalChoice at v1/user/poll/:pollid
  };

  return (
    <Button
      variant="primary"
      type="submit"
      disabled={!finalChoice}
      onClick={handleSubmit}
    >
      Mark your final choice
    </Button>
  );
};

export default SubmitFinalChoice;
