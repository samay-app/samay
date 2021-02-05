import { Form } from "react-bootstrap";
import { Dispatch } from "react";
import { Choice } from "../../models/poll";

const MarkFinalChoice = (props: {
  choices: Choice[];
  setFinalChoice: Dispatch<Choice | undefined>;
}): JSX.Element => {
  const { choices, setFinalChoice } = props;

  const handleChoiceChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { dataset, checked } = e.target;
    const choice: Choice = dataset.value ? JSON.parse(dataset.value) : {};
    if (checked) {
      setFinalChoice(choice);
    }
  };

  return (
    <tr>
      <td className="poll-table-choose-text">Final option</td>
      {choices.map((choice) => (
        <td key={choice.start} className="slot-checkbox-final-cell">
          <Form.Check
            data-value={JSON.stringify(choice)}
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
