import { Badge } from "react-bootstrap";
import {
  PersonCircle,
  PatchCheckFill,
  Globe,
  LockFill,
} from "react-bootstrap-icons";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { RocketMeetPollFromDB } from "../../models/poll";
import { decrypt } from "../../helpers/helpers";

dayjs.extend(localizedFormat);

const PollInfo = (props: { poll: RocketMeetPollFromDB }): JSX.Element => {
  const { poll } = props;
  return (
    <div className="poll-info-content">
      <Badge
        pill
        variant={poll.open ? "success" : "secondary"}
        className="rm-badge-poll"
      >
        {poll.open ? "Open" : "Closed"}
      </Badge>
      <span className="poll-info-title">{poll.title}</span>
      <span className="poll-info-desc">{poll.description}</span>
      {poll.finalChoice && (
        <span className="poll-info-final-date">
          <PatchCheckFill className="poll-info-final-date-star mr-2" />{" "}
          <b>
            {dayjs(poll.finalChoice.start).format("ddd")},{" "}
            {dayjs(poll.finalChoice.start).format("MMM")}{" "}
            {dayjs(poll.finalChoice.start).format("DD")},{" "}
            {dayjs(poll.finalChoice.start).format("LT")} -{" "}
            {dayjs(poll.finalChoice.end).format("LT")}
          </b>
        </span>
      )}
      <span className="poll-info-user">
        <PersonCircle className="mr-2" />{" "}
        <b>{decrypt(poll.encryptedEmailID)}</b>
      </span>
      <span className="poll-info-user">
        {poll.type === "public" && (
          <>
            <Globe className="mr-2" /> <b>Public</b>
          </>
        )}
        {poll.type === "protected" && (
          <>
            <LockFill className="mr-2" /> <b>Protected (login required)</b>
          </>
        )}
      </span>
    </div>
  );
};

export default PollInfo;
