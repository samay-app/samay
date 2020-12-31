import { Form } from "react-bootstrap";
import { Dispatch } from "react";
import { PollFromDBProps, MarkedProps } from "../models/poll";

const MarkChoices = (props: {
  pollFromDB: PollFromDBProps;
  newUserMarked: MarkedProps;
  setNewUserMarked: Dispatch<MarkedProps>;
}): JSX.Element => {
  const { pollFromDB, newUserMarked, setNewUserMarked } = props;
  const sortedChoices = pollFromDB.choices.sort((a, b) => a - b);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setNewUserMarked({ ...newUserMarked, userID: value });
  };

  const handleChoiceChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, checked } = e.target;
    if (checked) {
      const newChoices = newUserMarked.choices;
      newChoices.push(parseInt(value, 10));
      setNewUserMarked({ ...newUserMarked, choices: newChoices });
    } else {
      const newChoices = newUserMarked.choices;
      newChoices.splice(newChoices.indexOf(parseInt(value, 10)), 1); // remove the unchecked element from array
      setNewUserMarked({ ...newUserMarked, choices: newChoices });
    }
  };

  return (
    <tr>
      <td>
        <Form.Control
          type="text"
          placeholder="Enter your name"
          required
          onChange={handleNameChange}
        />
      </td>
      {sortedChoices.map((idx) => (
        <td key={idx} className="slot-checkbox-cell">
          <Form.Check
            value={idx}
            className="slot-checkbox"
            onChange={handleChoiceChange}
          />
        </td>
      ))}
    </tr>
  );
};

export default MarkChoices;
