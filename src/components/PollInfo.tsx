import { Alert } from "react-bootstrap";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { RocketMeetPollFromDB } from "../models/poll";
import { decrypt } from "../helpers/helpers";

dayjs.extend(localizedFormat);

const PollInfo = (props: { poll: RocketMeetPollFromDB }): JSX.Element => {
  const { poll } = props;

  return (
    <div className="justify-content-center">
      <h1>{poll.title}</h1>
      {poll.description}
      <Alert variant={poll.open ? "success" : "secondary"}>
        {poll.open ? "OPEN" : "CLOSED"}
      </Alert>
      By {decrypt(poll.emailID)} | Created on{" "}
      {dayjs(poll.createdAt).format("DD/MM/YYYY")}
    </div>
  );
};

export default PollInfo;
