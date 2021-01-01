import { Button } from "react-bootstrap";
import { MarkedProps } from "../models/poll";

const SubmitChoices = (props: { newMarked: MarkedProps }): JSX.Element => {
  const { newMarked } = props;

  const handleSubmit = (): void => {
    // PUT newMarked at v1/poll/:pollID
  };

  return (
    <Button
      variant="primary"
      type="submit"
      disabled={!newMarked.userID || newMarked.choices.length === 0}
      onClick={handleSubmit}
    >
      Mark your choice
    </Button>
  );
};

export default SubmitChoices;
