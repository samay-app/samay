import { Form } from "react-bootstrap";
import { Dispatch } from "react";
import { Time } from "../../models/poll";

const MarkFinalTime = (props: {
  times: Time[];
  setFinalTime: Dispatch<Time | undefined>;
}): JSX.Element => {
  const { times, setFinalTime } = props;

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { dataset, checked } = e.target;
    const time: Time = dataset.value ? JSON.parse(dataset.value) : {};
    if (checked) {
      setFinalTime(time);
    }
  };

  return (
    <tr>
      <td className="poll-table-choose-text">Final time</td>
      {times.map((time) => (
        <td key={time.start} className="poll-slot-checkbox-final-cell">
          <Form.Check
            data-value={JSON.stringify(time)}
            type="radio"
            className="poll-slot-checkbox"
            name="finalTime"
            onChange={handleTimeChange}
          />
        </td>
      ))}
    </tr>
  );
};

export default MarkFinalTime;
