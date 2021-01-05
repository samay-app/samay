import { Alert } from "react-bootstrap";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { PollFromDB } from "../models/poll";

dayjs.extend(localizedFormat);

const PollInfo = (props: { poll: PollFromDB }): JSX.Element => {
  const { poll } = props;

  return (
    <div className="justify-content-center">
      <h1>{poll.title}</h1>
      {poll.description}
      <Alert variant={poll.open ? "success" : "secondary"}>
        {poll.open ? "OPEN" : "CLOSED"}
      </Alert>
      By {poll.userID} | Created on {dayjs(poll.createdAt).format("DD/MM/YYYY")}
    </div>
  );
};

export default PollInfo;
