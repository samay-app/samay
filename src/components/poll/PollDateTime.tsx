import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { Time } from "../../models/poll";

dayjs.extend(localizedFormat);

const PollDateTime = (props: { time: Time }): JSX.Element => {
  const { time } = props;
  return (
    <div>
      <span className="datetime-weekday">
        {dayjs.unix(time.start).format("ddd")}
      </span>
      <span className="datetime-day">{dayjs.unix(time.start).format("D")}</span>
      <span className="datetime-mon">
        {dayjs.unix(time.start).format("MMM")}
      </span>
      <span className="datetime-time-1">
        {dayjs.unix(time.start).format("LT")}
      </span>
      <span className="datetime-time-2">
        {dayjs.unix(time.end).format("LT")}
      </span>
    </div>
  );
};

export default PollDateTime;
