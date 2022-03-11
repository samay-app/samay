import { Badge } from "react-bootstrap";
import { GeoAltFill, PatchCheckFill } from "react-bootstrap-icons";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { PollFromDB } from "../../models/poll";

dayjs.extend(localizedFormat);

const PollInfo = (props: { poll: PollFromDB }): JSX.Element => {
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
      {poll.description && (
        <span className="poll-info-desc">{poll.description}</span>
      )}
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
      {poll.location && (
        <span className="poll-info-user">
          <GeoAltFill className="poll-location" />
          {poll.location}
        </span>
      )}
    </div>
  );
};

export default PollInfo;
