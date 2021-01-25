import { Button } from "react-bootstrap";
import Router from "next/router";
import { Vote } from "../models/poll";
import { ServerAPI } from "src/api/server"
import { Server } from "tls";

const SubmitChoices = (props: {
  newVote: Vote;
  pollid: string;
}): JSX.Element => {
  const { newVote, pollid } = props;

  const handleSubmit = async (): Promise<void> => {
    const voterArgs = {
      newVote: newVote,
      pollid: pollid
    }
    const submitChoiceResponse = await ServerAPI.markChoices(voterArgs);
    if (submitChoiceResponse.statusCode === 201) {
      Router.reload()
    } else {
      console.log(submitChoiceResponse);
    }
    /*
    const payload = JSON.stringify(newVote);
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: payload,
    };
    console.log(requestOptions);
    fetch(`https://rocketmeet.herokuapp.com/v1/poll/${pollid}`, requestOptions)
      .then((res) => {
        if (res.status === 201) {
          Router.reload();
        } else {
          console.log(res.status);
        }
      })
      .catch((err) => {
        console.log(err);
      });
      */

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
