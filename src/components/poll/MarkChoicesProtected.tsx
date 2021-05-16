import { Form } from "react-bootstrap";
import { Dispatch } from "react";
import { Choice, Vote, RocketMeetPollFromDB } from "../../models/poll";
import { isUserPresentInVotes } from "../../helpers/helpers";

const MarkChoicesProtected = (props: {
  pollFromDB: RocketMeetPollFromDB;
  voterName: string;
  choices: Choice[];
  newVote: Vote;
  setNewVote: Dispatch<Vote>;
}): JSX.Element => {
  const { pollFromDB, voterName, choices, newVote, setNewVote } = props;

  let markChoicesHidden = false;
  if (
    pollFromDB.type === "protected" &&
    pollFromDB.votes &&
    isUserPresentInVotes(voterName, pollFromDB.votes)
  ) {
    markChoicesHidden = true;
  }

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
    <tr hidden={markChoicesHidden}>
      <td className="poll-table-choose-textbox">
        <Form.Control
          className="mark-choice-name"
          type="text"
          value={voterName}
          disabled
          required
        />
      </td>
      {choices.map((choice) => (
        <td key={choice.start} className="slot-checkbox-cell">
          <Form.Check
            name="choices"
            data-value={JSON.stringify(choice)}
            className="slot-checkbox"
            onChange={handleChoiceChange}
            disabled={!voterName}
          />
        </td>
      ))}
    </tr>
  );
};

export default MarkChoicesProtected;
