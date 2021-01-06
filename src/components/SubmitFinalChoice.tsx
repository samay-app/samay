import { Button } from "react-bootstrap";
import Router from "next/router";
import { Choice } from "../models/poll";

const SubmitFinalChoice = (props: {
  finalChoice: Choice | undefined;
  pollid: string;
}): JSX.Element => {
  const { finalChoice, pollid } = props;

  const handleSubmit = (): void => {
    const markFinalChoice = {
      choices: finalChoice,
      open: false,
    };
    const payload = JSON.stringify(markFinalChoice);

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: payload,
    };

    fetch(`http://localhost:5000/v1/user/poll/${pollid}`, requestOptions)
      .then((res) => {
        if (res.status === 201) {
          res.json().then((data) => {
            console.log(data);
          });
        } else {
          Router.reload(window.location.pathname);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Button
      variant="primary"
      className="mt-4 float-right"
      type="submit"
      disabled={!finalChoice}
      onClick={handleSubmit}
    >
      Mark your final choice
    </Button>
  );
};

export default SubmitFinalChoice;
