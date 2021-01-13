import { Badge } from "react-bootstrap";
import { Calendar2Fill, PersonCircle, StarFill } from "react-bootstrap-icons";
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
          <span className="poll-info-title">{poll.title}</span>
          <span className="poll-info-desc">{poll.description}</span>
          {poll.finalChoice && (
            <span className="poll-info-final-date">
              <StarFill className="poll-info-final-date-star" />{" "}
              <b>
                {dayjs(poll.finalChoice.start).format("llll")} -{" "}
                {dayjs(poll.finalChoice.end).format("LT")}
              </b>
            </span>
          )}
          <span className="poll-info-user">
            <PersonCircle /> <b>{decrypt(poll.encryptedEmailID)}</b>
          </span>
          <span className="poll-info-date">
            <Calendar2Fill />{" "}
            <b>{dayjs(poll.createdAt).format("DD/MM/YYYY")}</b>
          </span>
        </div>
        <div className="col-sm">
          <img
            src="/undraw_calendar_dutt.svg"
            className="poll-info-pic"
            alt="illustration"
          />
        </div>
      </div>
    </div>
  );
};

export default PollInfo;
