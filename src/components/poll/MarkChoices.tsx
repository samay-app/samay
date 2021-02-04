import { Form } from "react-bootstrap";
import { Dispatch } from "react";
import { Choice, Vote } from "../../models/poll";

const MarkChoices = (props: {
  choices: Choice[];
  newVote: Vote;
  setNewVote: Dispatch<Vote>;
}): JSX.Element => {
  const { choices, newVote, setNewVote } = props;

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setNewVote({ ...newVote, name: value });
  };

  const handleChoiceChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { dataset, checked } = e.target;
    const choice: Choice = dataset.value ? JSON.parse(dataset.value) : {};
    if (checked) {
      const newChoices = newVote.choices;
      newChoices.push(choice);
      setNewVote({ ...newVote, choices: newChoices });
    } else {
      let newChoices = newVote.choices;
      newChoices = newChoices.filter((item) => item.start !== choice.start);
      setNewVote({ ...newVote, choices: newChoices });
    }
  };

  return (
    <tr>
      <td className="poll-table-choose-textbox">
        <Form.Control
          className="mark-choice-name"
          type="text"
          placeholder="Name"
          required
          onChange={handleNameChange}
        />
      </td>
      {choices.map((choice) => (
        <td key={choice.start} className="slot-checkbox-cell">
          <Form.Check
            name="choices"
            data-value={JSON.stringify(choice)}
            className="slot-checkbox"
            onChange={handleChoiceChange}
          />
        </td>
      ))}
    </tr>
  );
};

export default MarkChoices;
