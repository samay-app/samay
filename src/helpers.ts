import crypto from 'crypto';
import { publicEncryptionKey, publicEncryptionIV } from './config';
import { Choice } from './db/models/poll';

export const isChoicePresentInPollChoices = (
  choiceToSearch: Choice, choices: Choice[],
): boolean => {
  return choices.some(
    (choice) => (choice.start === choiceToSearch.start && choice.end === choiceToSearch.end),
  );
};

export const encrypt = (text: string): string => {
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    Buffer.from(publicEncryptionKey),
    publicEncryptionIV,
  );
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString('hex');
};

export const decrypt = (text: string): string => {
  const encryptedText = Buffer.from(text, 'hex');
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    Buffer.from(publicEncryptionKey),
    publicEncryptionIV,
  );
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};
