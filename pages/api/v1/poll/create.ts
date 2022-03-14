import { NextApiRequest, NextApiResponse } from "next";
import RocketMeetPoll, { PollDoc } from "../../../../src/models/poll";
import connectToDatabase from "../../../../src/utils/db";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { method, body } = req;

  switch (method) {
    case "POST":
      try {
        await connectToDatabase();
        const newPoll: PollDoc = new RocketMeetPoll(JSON.parse(body));
        await newPoll.save();
        res.status(201).json(newPoll);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
