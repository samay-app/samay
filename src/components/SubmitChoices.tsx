import { Button } from "react-bootstrap";
import Router from "next/router";
import { Vote } from "../models/poll";

const SubmitChoices = (props: {
  newVote: Vote;
  pollid: string;
}): JSX.Element => {
  const { newVote, pollid } = props;

  const handleSubmit = (): void => {
    // PUT newVote at v1/poll/:pollID

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
          alert("Success!");
          Router.reload(window.location.pathname);
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
        variant="primary"
        className="mt-4 float-right"
        type="submit"
        disabled={!newVote.userID || newVote.choices.length === 0}
        onClick={handleSubmit}
      >
        Mark your choice
      </Button>
    </div>
  );
};

export default SubmitChoices;
