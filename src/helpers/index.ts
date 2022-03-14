import crypto from "crypto";
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

export const isChoiceIfNeedBe = (
  choice: Choice,
  choices: Choice[]
): boolean => {
  if (isChoicePresentInPollChoices(choice, choices)) {
    if (
      choices.find((currentChoice) => currentChoice.start === choice.start)
        ?.ifNeedBe
    )
      return true;
    return false;
  }
  return false;
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

const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "";
const ENCRYPTION_IV = process.env.NEXT_PUBLIC_ENCRYPTION_IV || "";

export const encrypt = (text: string): string => {
  let cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY),
    ENCRYPTION_IV
  );
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString("hex");
};

export const decrypt = (text: string): string => {
  const encryptedText = Buffer.from(text, "hex");
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY),
    ENCRYPTION_IV
  );
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};
