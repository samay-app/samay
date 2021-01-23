import { Button } from "react-bootstrap";
import Router from "next/router";
import { Vote } from "../models/poll";

const SubmitChoices = (props: {
  newVote: Vote;
  pollid: string;
}): JSX.Element => {
  const { newVote, pollid } = props;

  const handleSubmit = (): void => {
    const payload = JSON.stringify(newVote);
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: payload,
    };
    fetch(`http://localhost:5000/v1/poll/${pollid}`, requestOptions)
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
  };

  return (
    <div>
      <Button
        className="mt-4 float-right rm-primary-button"
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
