import { Form } from "react-bootstrap";
import { Dispatch, useState } from "react";
import { Check2, Check2Circle } from "react-bootstrap-icons";
import { TimeFromDB, Vote } from "../../models/poll";

const MarkTimes = (props: {
  username: string;
  times: TimeFromDB[];
  newVote: Vote;
  setNewVote: Dispatch<Vote>;
}): JSX.Element => {
  const { username, times, newVote, setNewVote } = props;

  const [timeBoxStatus, setTimeBoxStatus] = useState<Record<number, number>>(
    times.reduce((obj, cur) => ({ ...obj, [cur.start]: 0 }), {})
  );

  const statusValues = ["no", "yes", "if-need-be"];

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setNewVote({ username: value, times: newVote.times });
  };

  const handleMarkTimeBoxClick = (e: React.MouseEvent<HTMLElement>): void => {
    if (e.target !== e.currentTarget) return;
    const time = JSON.parse((e.target as HTMLElement).id);

    const newTimeBoxStatus = (timeBoxStatus[time.start] + 1) % 3;
    setTimeBoxStatus((prev) => ({ ...prev, [time.start]: newTimeBoxStatus }));

    let newTimes = newVote.times;

    if (newTimeBoxStatus === 1) {
      // yes
      newTimes = newTimes.filter((item) => item.start !== time.start);
      newTimes.push(time);
      setNewVote({ username: newVote.username, times: newTimes });
    } else if (newTimeBoxStatus === 2) {
      // if-need-be
      newTimes = newTimes.filter((item) => item.start !== time.start);
      time.ifNeedBe = true;
      newTimes.push(time);
      setNewVote({ username: newVote.username, times: newTimes });
    } else {
      // no
      newTimes = newTimes.filter((item) => item.start !== time.start);
      setNewVote({ username: newVote.username, times: newTimes });
    }
  };

  return (
    <tr>
      <td className="poll-table-choose-textbox">
        {username && (
          <Form.Control
            className="mark-time-name logged-in"
            type="text"
            value={username}
            disabled
          />
        )}
        {!username && (
          <Form.Control
            className="mark-time-name"
            type="text"
            placeholder="Your name"
            onChange={handleNameChange}
          />
        )}
      </td>
      {times.map((time) => (
        <td key={time.start} className="mark-time-cell">
          <div
            className={`mark-time-box ${
              statusValues[timeBoxStatus[time.start]]
            }`}
            id={JSON.stringify(time)}
            aria-hidden="true"
            onClick={handleMarkTimeBoxClick}
          >
            {timeBoxStatus[time.start] === 1 && (
              <Check2 className="mark-time-box-check yes" />
            )}
            {timeBoxStatus[time.start] === 2 && (
              <Check2Circle className="mark-time-box-check if-need-be" />
            )}
          </div>
        </td>
      ))}
    </tr>
  );
};

export default MarkTimes;
