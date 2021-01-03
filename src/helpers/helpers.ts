import { Choice, Vote } from "../models/poll";

const isPollChoicePresent = (choiceToSearch: Choice, vote: Vote): boolean => {
  return vote.choices.some(
    (choice) =>
      choice.start === choiceToSearch.start && choice.end === choiceToSearch.end
  );
};

export default isPollChoicePresent;
