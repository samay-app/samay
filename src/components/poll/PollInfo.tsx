import { Badge } from "react-bootstrap";
import { GeoAltFill, PersonCircle } from "react-bootstrap-icons";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { PollFromDB } from "../../models/poll";

dayjs.extend(localizedFormat);

const PollInfo = (props: { poll: PollFromDB }): JSX.Element => {
  const { poll } = props;
  return (
    <div>
      <Badge
        pill
        variant={poll.open ? "success" : "secondary"}
        className={poll.open ? "poll-badge-open" : "poll-badge-closed"}
      >
        {poll.open ? "Open" : "Closed"}
      </Badge>
      <span className="poll-info-title">{poll.title}</span>
      {poll.description && (
        <span className="poll-info-desc">{poll.description}</span>
      )}
      {poll.location && (
        <span className="poll-info-detail-title">
          <GeoAltFill className="poll-info-icon" />
          {poll.location}
        </span>
      )}
      <span className="poll-info-detail-title">
        <PersonCircle className="poll-info-icon" />
        {poll.username}
      </span>
    </div>
  );
};

export default PollInfo;
