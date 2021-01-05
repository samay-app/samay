import { Button } from "react-bootstrap";
import { Vote } from "../models/poll";
import Router from 'next/router'

const SubmitChoices = (props: { newVote: Vote, pollid: string }): JSX.Element => {
  const { newVote, pollid } = props;

  const handleSubmit = (): void => {
    // PUT newVote at v1/poll/:pollID
    console.log(newVote);
    console.log(pollid)

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }
    // TODO : Add authorisation header 
    // headers["Authorization"] = "Bearer " + getIdToken();
    const payload = JSON.stringify(newVote);

    const requestOptions = {
      method: "PUT",
      headers: headers,
      body: payload
    };

    console.log(payload)

    fetch("http://localhost:5000/v1/poll/" + pollid, requestOptions)
      .then((res) => {
        if (res.status === 201) {
          res.json()
            .then((data) => {
              console.log(data)
              alert("Success!")
              Router.reload(window.location.pathname);
            })
        } else {
          console.log(res.status)
        }
      })
      .catch((err) => console.log(err))
  }

  return (
    <div>
      <Button
        variant="primary"
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
