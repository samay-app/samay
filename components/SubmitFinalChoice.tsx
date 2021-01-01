import { Button } from "react-bootstrap";

const SubmitFinalChoice = (props: {
  finalChoice: number | undefined;
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
