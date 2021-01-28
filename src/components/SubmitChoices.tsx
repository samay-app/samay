import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import Router from "next/router";
import { Vote } from "../models/poll";
import { serverAPI } from "src/api/server"
import { RootState } from "src/store/store";

const SubmitChoices = (props: {
  newVote: Vote;
  pollid: string;
}): JSX.Element => {
  const { newVote, pollid } = props;
  const token = useSelector((state: RootState) => state.authReducer.token);

  const handleSubmit = async (): Promise<void> => {
    const voterArgs = {
      newVote,
      pollid,
      token
    }
    const submitChoiceResponse = await serverAPI.markChoices(voterArgs);
    if (submitChoiceResponse.statusCode === 201) {
      Router.reload()
    } else {
      console.log(submitChoiceResponse);
    }

  };

  return (
    <div>
      <Button
        className="mt-4 mb-4 rm-primary-button-small mark-options-btn"
        type="submit"
        disabled={!newVote.name || newVote.choices.length === 0}
        onClick={handleSubmit}
      >
        Mark your availability
      </Button>
    </div>
  );
};

export default SubmitChoices;
