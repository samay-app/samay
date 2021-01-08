import crypto from "crypto";
import { Choice } from "../models/poll";

export const isChoicePresentInPollChoices = (
  choiceToSearch: Choice,
  choices: Choice[]
): boolean => {
  return choices.some(
    (choice) =>
      choice.start === choiceToSearch.start && choice.end === choiceToSearch.end
  );
};

const ENCRYPTION_KEY = "DB348D009200EF079180E558859488A2"; // process.env.ENCRYPTION_KEY;

export const encrypt = (text: string): string => {
  const iv = crypto.randomBytes(16);
  let cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY),
    iv
  );
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return JSON.stringify({
    iv: iv.toString("hex"),
    encryptedText: encrypted.toString("hex"),
  });
};

export const decrypt = (text: string): string => {
  const iv = Buffer.from(JSON.parse(text).iv, "hex");
  const encryptedText = Buffer.from(JSON.parse(text).encryptedText, "hex");
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY),
    iv
  );
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};
