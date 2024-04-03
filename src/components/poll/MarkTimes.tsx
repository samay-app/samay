import { Dispatch, useState } from "react";
import { CheckCircleFill, CircleFill } from "react-bootstrap-icons";
import { Time, Vote } from "../../models/poll";

const MarkTimes = (props: {
  times: Time[];
  newVote: Vote;
  setNewVote: Dispatch<Vote>;
}): JSX.Element => {
  const { times, newVote, setNewVote } = props;

  const [timeBoxStatus, setTimeBoxStatus] = useState<Record<string, number>>(
    times.reduce(
      (obj, cur) => ({
        ...obj,
        [JSON.stringify({ start: cur.start, end: cur.end })]: 0,
      }),
      {}
    )
  );

  const statusValues = ["no", "yes", "if-need-be"];

  const handleMarkTimeBoxClick = (e: React.MouseEvent<HTMLElement>): void => {
    if (e.target !== e.currentTarget) return;

    const time = JSON.parse((e.target as HTMLElement).id);

    const newTimeBoxStatus =
      (timeBoxStatus[JSON.stringify({ start: time.start, end: time.end })] +
        1) %
      3;

    setTimeBoxStatus((prev) => ({
      ...prev,
      [JSON.stringify({ start: time.start, end: time.end })]: newTimeBoxStatus,
    }));

    let newTimes = newVote.times;

    if (newTimeBoxStatus === 1) {
      // yes
      newTimes = newTimes.filter(
        (item) => item.start !== time.start || item.end !== time.end
      );
      newTimes.push(time);
      setNewVote({ name: newVote.name, times: newTimes });
    } else if (newTimeBoxStatus === 2) {
      // if-need-be
      newTimes = newTimes.filter(
        (item) => item.start !== time.start || item.end !== time.end
      );
      time.ifNeedBe = true;
      newTimes.push(time);
      setNewVote({ name: newVote.name, times: newTimes });
    } else {
      // no
      newTimes = newTimes.filter(
        (item) => item.start !== time.start || item.end !== time.end
      );
      setNewVote({ name: newVote.name, times: newTimes });
    }
  };

  return (
    <tr>
      {times.map((time) => (
        <td key={JSON.stringify(time)} className="poll-mark-time-cell">
          <div
            className={`poll-mark-time-box ${
              statusValues[
                timeBoxStatus[
                  JSON.stringify({ start: time.start, end: time.end })
                ]
              ]
            }`}
            id={JSON.stringify(time)}
            aria-hidden="true"
            onClick={handleMarkTimeBoxClick}
          >
            {timeBoxStatus[
              JSON.stringify({ start: time.start, end: time.end })
            ] === 1 && (
              <CheckCircleFill className="poll-mark-time-box-check yes" />
            )}
            {timeBoxStatus[
              JSON.stringify({ start: time.start, end: time.end })
            ] === 2 && (
              <CircleFill className="poll-mark-time-box-check if-need-be" />
            )}
          </div>
        </td>
      ))}
    </tr>
  );
};

export default MarkTimes;
