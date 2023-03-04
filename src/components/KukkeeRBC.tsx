import { Calendar, Views, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import { Time } from "../models/poll";

const localizer = dayjsLocalizer(dayjs);

const KukkeeRBC = (props: { pollTimes; setTimes }): JSX.Element => {
  const { pollTimes, setTimes } = props;

  const onTimesChange = ({ start, end }): void => {
    const newTime: Time = {
      start: start.getTime(),
      end: end.getTime(),
    };

    setTimes([...pollTimes, newTime]);
  };

  const onTimeRemove = ({ start, end }): void => {
    const newPollTimes = pollTimes.filter(
      (time) => !(time.start === start.getTime() && time.end === end.getTime())
    );

    setTimes([...newPollTimes]);
  };

  return (
    <Calendar
      defaultView={Views.WEEK}
      events={pollTimes.map((time) => ({
        start: new Date(time.start),
        end: new Date(time.end),
      }))}
      localizer={localizer}
      onSelectSlot={onTimesChange}
      onSelectEvent={onTimeRemove}
      step={15}
      views={["week"]}
      selectable
    />
  );
};

export default KukkeeRBC;
