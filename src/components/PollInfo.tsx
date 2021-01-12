import { Badge } from "react-bootstrap";
import {
  Calendar2Fill,
  CalendarRange,
  PersonCircle,
} from "react-bootstrap-icons";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { RocketMeetPollFromDB } from "../models/poll";
import { decrypt } from "../helpers/helpers";

dayjs.extend(localizedFormat);

const PollInfo = (props: { poll: RocketMeetPollFromDB }): JSX.Element => {
  const { poll } = props;
  return (
    <div className="justify-content-center poll-info">
      <div className="row">
        <div className="col-sm">
          <Badge pill variant={poll.open ? "success" : "secondary"}>
            {poll.open ? "Open" : "Closed"}
          </Badge>
          <h1>{poll.title}</h1>
          <h5>{poll.description}</h5>
          <span className="poll-info-user">
            <PersonCircle /> <b>{decrypt(poll.encryptedEmailID)}</b>
          </span>
          <span className="poll-info-date">
            <Calendar2Fill />{" "}
            <b>{dayjs(poll.createdAt).format("DD/MM/YYYY")}</b>
          </span>
        </div>
        <div className="col-sm">
          <CalendarRange className="poll-info-cal-icon" />
        </div>
      </div>
    </div>
  );
};

export default PollInfo;
