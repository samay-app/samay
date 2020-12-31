import { Button } from "react-bootstrap";

const SubmitFinalChoice = (props: {
  finalChoice: number | undefined;
}): JSX.Element => {
  const { finalChoice } = props;

  const handleSubmit = (): void => {
    // PUT finalChoice at v1/user/poll/{pollID}
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
