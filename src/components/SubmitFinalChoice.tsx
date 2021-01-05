import { Button } from "react-bootstrap";
import { Choice } from "../models/poll";

const SubmitFinalChoice = (props: {
  finalChoice: Choice | undefined,
  pollid: string
}): JSX.Element => {
  const { finalChoice, pollid } = props;

  const handleSubmit = (): void => {
    const markFinalChoice = {
      choices: finalChoice,
      open: false,
    };
    // PUT markFinalChoice at v1/user/poll/:pollid

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }
    // TODO : Add authorisation header 
    // headers["Authorization"] = "Bearer " + getIdToken();
    const payload = JSON.stringify(markFinalChoice);

    const requestOptions = {
      method: "PUT",
      headers: headers,
      body: payload
    };

    console.log(payload)
    fetch("http://localhost:5000/v1/user/poll/" + pollid, requestOptions)
      .then((res) => {
        if (res.status === 201) {
          res.json()
            .then((data) => {
              console.log(data)
            })
        } else {
          console.log(res.status)
          console.log(res)
          Router.reload(window.location.pathname);
        }
      })
      .catch((err) => console.log(err))
  }

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
