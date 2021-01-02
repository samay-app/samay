import { Button } from "react-bootstrap";
import { Vote } from "../models/poll";

const SubmitChoices = (props: { newVote: Vote }): JSX.Element => {
  const { newVote } = props;

  const handleSubmit = (): void => {
    // PUT newVote at v1/poll/:pollID
  };

  return (
    <Button
      variant="primary"
      type="submit"
      disabled={!newVote.userID || newVote.choices.length === 0}
      onClick={handleSubmit}
    >
      Mark your choice
    </Button>
  );
};

export default SubmitChoices;
