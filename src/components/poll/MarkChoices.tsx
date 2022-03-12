import { Form } from "react-bootstrap";
import { Dispatch, useState } from "react";
import { Choice, Vote } from "../../models/poll";

const MarkChoices = (props: {
  choices: Choice[];
  newVote: Vote;
  setNewVote: Dispatch<Vote>;
}): JSX.Element => {
  const { choices, newVote, setNewVote } = props;

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setNewVote({ name: value, choices: newVote.choices });
  };

  const [ifNeedBeHidden, setIfNeedBeHidden] = useState<Record<number, boolean>>(
    {}
  );

  const [ifNeedBe, setIfNeedBe] = useState<Record<number, boolean>>({});

  const handleChoiceChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { dataset, checked } = e.target;
    const choice: Choice = dataset.value ? JSON.parse(dataset.value) : {};
    let newChoices = newVote.choices;
    if (checked) {
      setIfNeedBeHidden((prev) => ({ ...prev, [choice.start]: true }));
      choice.ifNeedBe = ifNeedBe[choice.start];
      newChoices.push(choice);
      setNewVote({ name: newVote.name, choices: newChoices });
    } else {
      setIfNeedBeHidden((prev) => ({ ...prev, [choice.start]: false }));
      newChoices = newChoices.filter((item) => item.start !== choice.start);
      setNewVote({ name: newVote.name, choices: newChoices });
    }
  };

  const handleIfNeedBeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { dataset, checked } = e.target;
    let choice: Choice = dataset.value ? JSON.parse(dataset.value) : {};
    let newChoices = newVote.choices;
    if (checked) {
      setIfNeedBe((prev) => ({ ...prev, [choice.start]: true }));
      newChoices = newChoices.filter((item) => item.start !== choice.start);
      choice.ifNeedBe = true;
      newChoices.push(choice);
      setNewVote({ name: newVote.name, choices: newChoices });
    } else {
      setIfNeedBe((prev) => ({ ...prev, [choice.start]: false }));
      newChoices = newChoices.filter((item) => item.start !== choice.start);
      choice.ifNeedBe = false;
      newChoices.push(choice);
      setNewVote({ name: newVote.name, choices: newChoices });
    }
  };

  return (
    <tr>
      <td className="poll-table-choose-textbox">
        <Form.Control
          className="mark-choice-name"
          type="text"
          placeholder="Your name"
          required
          onChange={handleNameChange}
        />
      </td>
      {choices.map((choice) => (
        <td key={choice.start} className="slot-checkbox-cell">
          <Form.Check
            data-value={JSON.stringify(choice)}
            className="slot-checkbox"
            onChange={handleChoiceChange}
          />

          <Form.Check
            data-value={JSON.stringify(choice)}
            className="if-need-be-checkbox"
            hidden={!ifNeedBeHidden[choice.start]}
            onChange={handleIfNeedBeChange}
          />
        </td>
      ))}
    </tr>
  );
};

export default MarkChoices;
