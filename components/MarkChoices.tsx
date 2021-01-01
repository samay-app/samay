import { Form } from "react-bootstrap";
import { Dispatch } from "react";
import { MarkedProps } from "../models/poll";

const MarkChoices = (props: {
  sortedChoices: number[];
  newMarked: MarkedProps;
  setNewMarked: Dispatch<MarkedProps>;
}): JSX.Element => {
  const { sortedChoices, newMarked, setNewMarked } = props;

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setNewMarked({ ...newMarked, userID: value });
  };

  const handleChoiceChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, checked } = e.target;
    if (checked) {
      const newChoices = newMarked.choices;
      newChoices.push(parseInt(value, 10));
      setNewMarked({ ...newMarked, choices: newChoices });
    } else {
      const newChoices = newMarked.choices;
      newChoices.splice(newChoices.indexOf(parseInt(value, 10)), 1); // remove the unchecked element from array
      setNewMarked({ ...newMarked, choices: newChoices });
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
