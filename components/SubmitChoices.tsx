import { Button } from "react-bootstrap";
import { MarkedProps } from "../models/poll";

const SubmitChoices = (props: { newUserMarked: MarkedProps }): JSX.Element => {
  const { newUserMarked } = props;

  const handleSubmit = (): void => {
    // PUT newUserMarked at v1/poll/{pollID}
  };

  return (
    <Button
      variant="primary"
      type="submit"
      disabled={!newUserMarked.userID || newUserMarked.choices.length === 0}
      onClick={handleSubmit}
    >
      Mark your choice
    </Button>
  );
};

export default SubmitChoices;
