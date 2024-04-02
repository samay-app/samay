import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { Time } from "../../models/poll";
import { isDayAndMonthSame } from "../../helpers";

dayjs.extend(localizedFormat);

const PollDateTime = (props: {
  time: Time;
  type: string;
  index: number;
  times: Time[];
}): JSX.Element => {
  const { time, type, index, times } = props;

  let topComponent = <></>;

  if (index === 0) {
    topComponent = (
      <>
        <span className="datetime-weekday">
          {dayjs(time.start).format("ddd")}
        </span>
        <span className="datetime-day">{dayjs(time.start).format("D")}</span>
        <span className="datetime-mon">{dayjs(time.start).format("MMM")}</span>
      </>
    );
  } else if (!isDayAndMonthSame(time, times[index - 1])) {
    topComponent = (
      <>
        <span className="datetime-weekday">
          {dayjs(time.start).format("ddd")}
        </span>
        <span className="datetime-day">{dayjs(time.start).format("D")}</span>
        <span className="datetime-mon">{dayjs(time.start).format("MMM")}</span>
      </>
    );
  } else if (!isDayAndMonthSame(time, times[index + 1])) {
    topComponent = <div className="datetime-same-last-line" />;
  } else {
    topComponent = <div className="datetime-same-middle-line" />;
  }

  return (
    <div>
      {topComponent}
      <div className="datetime-sep-time-div">
        <div>
          <span
            className={`${
              type === "voter"
                ? "datetime-time-sep-voter"
                : "datetime-time-sep-admin"
            }`}
          >
            [
          </span>
        </div>
        <div>
          <span className="datetime-time-1">
            {dayjs(time.start).format("LT")}
          </span>
          <span className="datetime-time-2">
            {dayjs(time.end).format("LT")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PollDateTime;
