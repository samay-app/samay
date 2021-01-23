import { Badge, OverlayTrigger, Tooltip } from "react-bootstrap";
import {
  Calendar2Fill,
  InfoCircleFill,
  PersonCircle,
  StarFill,
} from "react-bootstrap-icons";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { RocketMeetPollFromDB } from "../models/poll";
import { decrypt } from "../helpers/helpers";

dayjs.extend(localizedFormat);

const PollInfo = (props: { poll: RocketMeetPollFromDB }): JSX.Element => {
  const { poll } = props;
  return (
    <div className="poll-info-content">
      <Badge pill variant={poll.open ? "success" : "secondary"}>
        {poll.open ? "Open" : "Closed"}
      </Badge>
      <span className="poll-info-title">{poll.title}</span>
      <span className="poll-info-desc">{poll.description}</span>
      {poll.finalChoice && (
        <span className="poll-info-final-date">
          <StarFill className="poll-info-final-date-star mr-2" />{" "}
          <b>
            {dayjs(poll.finalChoice.start).format("llll")} -{" "}
            {dayjs(poll.finalChoice.end).format("LT")}
          </b>
        </span>
      )}
      <span className="poll-info-user">
        <PersonCircle className="mr-2" />{" "}
        <b>{decrypt(poll.encryptedEmailID)}</b>
      </span>
      <span className="poll-info-date">
        <Calendar2Fill className="mr-2" />{" "}
        <b>{dayjs(poll.createdAt).format("DD/MM/YYYY")}</b>
      </span>

      <OverlayTrigger
        placement="right"
        overlay={
          <Tooltip id="timezone-info">
            The times are displayed in your time zone.
          </Tooltip>
        }
      >
        <InfoCircleFill className="timezone-info-icon" />
      </OverlayTrigger>
    </div>
  );
};

export default PollInfo;
