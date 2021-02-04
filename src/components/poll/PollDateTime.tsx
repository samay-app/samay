import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { Choice } from "../../models/poll";

dayjs.extend(localizedFormat);

const PollDateTime = (props: { choice: Choice }): JSX.Element => {
  const { choice } = props;
  return (
    <div>
      <span className="datetime-weekday">
        {dayjs(choice.start).format("ddd")}
      </span>
      <span className="datetime-day">{dayjs(choice.start).format("D")}</span>
      <span className="datetime-mon">{dayjs(choice.start).format("MMM")}</span>
      <span className="datetime-time-1">
        {dayjs(choice.start).format("LT")}
      </span>
      <span className="datetime-time-2">{dayjs(choice.end).format("LT")}</span>
    </div>
  );
};

export default PollDateTime;
