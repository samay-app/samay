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
