import { Badge } from "react-bootstrap";
import { GeoAltFill } from "react-bootstrap-icons";
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
        className={
          poll.open ? "kukkee-badge-poll-open" : "kukkee-badge-poll-closed"
        }
      >
        {poll.open ? "Open" : "Closed"}
      </Badge>
      <span className="poll-info-title">{poll.title}</span>
      {poll.description && (
        <span className="poll-info-desc">{poll.description}</span>
      )}
      {poll.location && (
        <span className="poll-info-location">
          <GeoAltFill className="poll-location" />
          {poll.location}
        </span>
      )}
    </div>
  );
};

export default PollInfo;
