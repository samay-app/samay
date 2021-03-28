import crypto from "crypto";
import dayjs from "dayjs";
import {
  Choice,
  RocketMeetPollFromDB,
  ChoiceFromDB,
  VoteFromDB,
  PieObj,
  ChartDataArgs,
} from "../models/poll";

export const isChoicePresentInPollChoices = (
  choiceToSearch: Choice,
  choices: Choice[]
): boolean => {
  return choices.some(
    (choice) =>
      choice.start === choiceToSearch.start && choice.end === choiceToSearch.end
  );
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

export const ChartData = (pollFromDB: RocketMeetPollFromDB): ChartDataArgs => {
  const obj: PieObj = {};
  const arr = pollFromDB.choices;

  arr.forEach((el: ChoiceFromDB) => {
    obj[el._id] = {
      start: el.start,
      end: el.end,
      voters: [],
    };
  });

  const votesArr = pollFromDB?.votes;
  if (votesArr) {
    votesArr.forEach((vote: VoteFromDB) => {
      vote.choices.forEach((choice: ChoiceFromDB) => {
        obj[choice._id].voters.push(vote.name);
      });
    });
  }

  const objectKeySet = Object.keys(obj);

  const getRandom = (): number => {
    let max = 255;
    let min = 10;
    return min + Math.floor(Math.random() * (max - min));
  };

  const getColor = (): string => {
    let opacity = 0.6;
    let first = getRandom();
    let second = getRandom();
    let third = getRandom();
    let result = "";

    result = `rgba(${first},${second},${third},${opacity})`;

    return result;
  };

  const labelsForChart = objectKeySet.map((key: string) => {
    const option = obj[key];

    let label = `${dayjs(option.start).format("D")}-${dayjs(
      option.start
    ).format("MMM")} ${dayjs(option.start).format("LT")}`;

    let labelSize = label.length;
    if (labelSize === 13) {
      label = `    ${label}`;
    } else if (labelSize === 14) {
      label = `  ${label}`;
    }
    return label;
  });

  const chartData: ChartDataArgs = {
    labels: labelsForChart,
    datasets: [
      {
        label: "Votes",
        data: objectKeySet.map((key: string) => obj[key].voters.length),
        backgroundColor: objectKeySet.map((): string => getColor()),
      },
    ],
  };

  return chartData;
};
