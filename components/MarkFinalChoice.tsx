import { Form } from "react-bootstrap";
import { Dispatch } from "react";

const MarkFinalChoice = (props: {
  sortedChoices: number[];
  setFinalChoice: Dispatch<number | undefined>;
}): JSX.Element => {
  const { sortedChoices, setFinalChoice } = props;

  const handleChoiceChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, checked } = e.target;
    if (checked) {
      setFinalChoice(parseInt(value, 10));
    }
  };

  return (
    <tr>
      <td>
        <h5>Final option</h5>
      </td>
      {sortedChoices.map((idx) => (
        <td key={idx} className="slot-checkbox-final-cell">
          <Form.Check
            value={idx}
            type="radio"
            className="slot-checkbox"
            name="finalChoice"
            onChange={handleChoiceChange}
          />
        </td>
      ))}
    </tr>
  );
};

export default MarkFinalChoice;
