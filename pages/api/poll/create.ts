import { NextApiRequest, NextApiResponse } from "next";
import RocketMeetPoll, { Poll, PollDoc } from "../../../src/models/poll";
import connectToDatabase from "../../../src/utils/db";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === "POST") {
    try {
      await connectToDatabase();
      const body: Poll = JSON.parse(req.body);
      const newPoll: PollDoc = new RocketMeetPoll(body);
      await newPoll.save();
      res.status(201).json(newPoll);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  } else {
    res.status(405).json({ messagge: "Method not allowed" });
  }
};
