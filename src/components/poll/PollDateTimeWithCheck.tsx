import { CheckCircleFill, CircleFill } from "react-bootstrap-icons";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { Time } from "../../models/poll";
import { isTimePresentInPollTimes, isTimeIfNeedBe } from "../../helpers";

dayjs.extend(localizedFormat);

const PollDateTimeWithCheck = (props: {
  time: Time;
  voteTimes: Time[];
}): JSX.Element => {
  const { time, voteTimes } = props;

  let checkMark = <></>;

  if (isTimePresentInPollTimes(time, voteTimes)) {
    if (isTimeIfNeedBe(time, voteTimes))
      checkMark = <CircleFill className="slot-check-date-time-if-need-be" />;
    else checkMark = <CheckCircleFill className="slot-check-date-time-yes" />;
  }
  return (
    <div className="datetime-div">
      <span className="datetime-weekday">
        {dayjs(time.start).format("ddd")}
      </span>
      {checkMark}
      <span className="datetime-day">{dayjs(time.start).format("D")}</span>
      <span className="datetime-mon">{dayjs(time.start).format("MMM")}</span>
      <span className="datetime-time-1">{dayjs(time.start).format("LT")}</span>
      <span className="datetime-time-2">{dayjs(time.end).format("LT")}</span>
    </div>
  );
};

export default PollDateTimeWithCheck;
