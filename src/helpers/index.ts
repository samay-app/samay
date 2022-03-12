import { Choice, VoteFromDB } from "../models/poll";

export const isChoicePresentInPollChoices = (
  choiceToSearch: Choice,
  choices: Choice[]
): boolean => {
  return choices.some(
    (choice) =>
      choice.start === choiceToSearch.start && choice.end === choiceToSearch.end
  );
};

export const slotCheckClassName = (
  choice: Choice,
  choices: Choice[]
): string => {
  if (isChoicePresentInPollChoices(choice, choices)) {
    if (
      choices.find((currentChoice) => currentChoice.start === choice.start)
        ?.ifNeedBe
    )
      return "slot-checked-if-need-be";
    return "slot-checked";
  }
  return "slot-unchecked";
};

export const slotTimeClassName = (
  choice: Choice,
  voteChoices: Choice[],
  finalChoice?: Choice
): string => {
  if (choice.start === finalChoice?.start && choice.end === finalChoice?.end)
    return "slot-time slot-final-choice";

  if (isChoicePresentInPollChoices(choice, voteChoices)) {
    if (
      voteChoices.find((currentChoice) => currentChoice.start === choice.start)
        ?.ifNeedBe
    )
      return "slot-time slot-if-need-be-choice";
    return "slot-time slot-normal-choice";
  }
  return "slot-time";
};

export const isUserPresentInVotes = (
  userToSearch: string,
  votes: VoteFromDB[]
): boolean => {
  return votes.some((vote) => vote.name === userToSearch);
};
