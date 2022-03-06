import { Choice, Vote } from './db/models/poll';

export const isChoicePresentInPollChoices = (
  choiceToSearch: Choice, choices: Choice[],
): boolean => {
  return choices.some(
    (choice) => (choice.start === choiceToSearch.start && choice.end === choiceToSearch.end),
  );
};
