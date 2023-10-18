import { Badge } from "react-bootstrap";
import {
  CalendarCheck,
  CheckCircleFill,
  GeoAltFill,
  Globe,
} from "react-bootstrap-icons";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import timezone from "dayjs/plugin/timezone";
import { PollFromDB, Time } from "../../models/poll";

dayjs.extend(localizedFormat);
dayjs.extend(timezone);

const PollInfo = (props: {
  poll: PollFromDB;
  showFinalTime: boolean;
  showVoteRecordedGroup: boolean;
  showVoteRecordedOneOnOne: boolean;
  votedTimeOneOnOne: Time;
}): JSX.Element => {
  const {
    poll,
    showFinalTime,
    showVoteRecordedGroup,
    showVoteRecordedOneOnOne,
    votedTimeOneOnOne,
  } = props;

  return (
    <div>
      <Badge
        pill
        variant={poll.open ? "success" : "secondary"}
        className={poll.open ? "poll-badge-open" : "poll-badge-closed"}
      >
        {poll.open ? "Open" : "Closed"}
      </Badge>
      {poll.title && (
        <span
          className={`poll-info-title ${
            poll.description ? "" : "poll-info-title-no-desc"
          }`}
        >
          {poll.title}
        </span>
      )}
      {!poll.title && (
        <span
          className={`poll-info-title ${
            poll.description ? "" : "poll-info-title-no-desc"
          }`}
        >
          Untitled
        </span>
      )}
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
        <Globe className="poll-info-icon" />
        Times are shown in: {dayjs.tz.guess()} timezone
      </span>
      {showFinalTime && (
        <span className="poll-info-final-time">
          <CalendarCheck className="poll-info-final-time-decided-icon" />
          {dayjs(poll.finalTime?.start).format("ddd")},{" "}
          {dayjs(poll.finalTime?.start).format("MMM")}{" "}
          {dayjs(poll.finalTime?.start).format("DD")},{" "}
          {dayjs(poll.finalTime?.start).format("LT")} -{" "}
          {dayjs(poll.finalTime?.end).format("LT")}
        </span>
      )}
      {showVoteRecordedGroup && !showFinalTime && (
        <span className="voter-page-vote-recorded">
          <CheckCircleFill className="poll-vote-recorded-icon" />
          Your vote has been successfully recorded.
        </span>
      )}
      {showVoteRecordedOneOnOne && votedTimeOneOnOne && !showFinalTime && (
        <span className="voter-page-vote-recorded">
          <CheckCircleFill className="poll-vote-recorded-icon" />
          Your vote for the time [{dayjs(votedTimeOneOnOne.start).format(
            "LT"
          )}{" "}
          - {dayjs(votedTimeOneOnOne.end).format("LT")}] on{" "}
          {dayjs(votedTimeOneOnOne.start).format("DD")}{" "}
          {dayjs(votedTimeOneOnOne.start).format("MMM")} has been successfully
          recorded.
        </span>
      )}
    </div>
  );
};

export default PollInfo;
