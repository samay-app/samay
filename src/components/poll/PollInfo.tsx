import { Badge } from "react-bootstrap";
import { CalendarCheck, GeoAltFill } from "react-bootstrap-icons";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { PollFromDB } from "../../models/poll";

dayjs.extend(localizedFormat);

const PollInfo = (props: {
  poll: PollFromDB;
  showFinalTime: boolean;
}): JSX.Element => {
  const { poll, showFinalTime } = props;
  return (
    <div>
      <Badge
        pill
        variant={poll.open ? "success" : "secondary"}
        className={poll.open ? "poll-badge-open" : "poll-badge-closed"}
      >
        {poll.open ? "Open" : "Closed"}
      </Badge>
      {poll.title && <span className="poll-info-title">{poll.title}</span>}
      {!poll.title && <span className="poll-info-title">Untitled</span>}
      {poll.description && (
        <span className="poll-info-desc">{poll.description}</span>
      )}
      {poll.location && (
        <span className="poll-info-detail-title">
          <GeoAltFill className="poll-info-icon" />
          {poll.location}
        </span>
      )}
      {showFinalTime && (
        <span className="poll-info-detail-title">
          <CalendarCheck className="poll-info-icon" />
          {dayjs(poll.finalTime?.start).format("ddd")},{" "}
          {dayjs(poll.finalTime?.start).format("MMM")}{" "}
          {dayjs(poll.finalTime?.start).format("DD")},{" "}
          {dayjs(poll.finalTime?.start).format("LT")} -{" "}
          {dayjs(poll.finalTime?.end).format("LT")}
        </span>
      )}
    </div>
  );
};

export default PollInfo;
