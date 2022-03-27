import crypto from "crypto";
import { Time, Vote, VoteFromDB } from "../models/poll";

export const isTimePresentInPollTimes = (
  timeToSearch: Time,
  times: Time[]
): boolean => {
  return times.some(
    (time) => time.start === timeToSearch.start && time.end === timeToSearch.end
  );
};

export const slotCheckClassName = (time: Time, times: Time[]): string => {
  if (isTimePresentInPollTimes(time, times)) {
    if (times.find((currentTime) => currentTime.start === time.start)?.ifNeedBe)
      return "slot-checked-if-need-be";
    return "slot-checked";
  }
  return "slot-unchecked";
};

export const isTimeIfNeedBe = (time: Time, times: Time[]): boolean => {
  if (isTimePresentInPollTimes(time, times)) {
    if (times.find((currentTime) => currentTime.start === time.start)?.ifNeedBe)
      return true;
    return false;
  }
  return false;
};

export const slotTimeClassName = (
  time: Time,
  voteTimes: Time[],
  finalTime?: Time
): string => {
  if (time.start === finalTime?.start && time.end === finalTime?.end)
    return "slot-time slot-final-time";

  if (isTimePresentInPollTimes(time, voteTimes)) {
    if (
      voteTimes.find((currentTime) => currentTime.start === time.start)
        ?.ifNeedBe
    )
      return "slot-time slot-if-need-be-time";
    return "slot-time slot-normal-time";
  }
  return "slot-time";
};

export const isUserPresentInVotes = (
  userToSearch: string,
  votes: Vote[] | VoteFromDB[] | undefined
): boolean => {
  if (!votes) return false;
  return votes.some((vote) => vote.username === userToSearch);
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
