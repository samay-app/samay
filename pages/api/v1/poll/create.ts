import { NextApiRequest, NextApiResponse } from "next";
import RocketMeetPoll, { PollDoc } from "../../../../src/models/poll";
import connectToDatabase from "../../../../src/utils/db";
import rateLimit from "../../../../src/utils/rate-limit";

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { method, body } = req;

  switch (method) {
    case "POST":
      try {
        await limiter.check(res, 10, "CACHE_TOKEN");
        try {
          await connectToDatabase();
          const newPoll: PollDoc = new RocketMeetPoll(JSON.parse(body));
          await newPoll.save();
          res.status(201).json(newPoll);
        } catch (err) {
          res.status(400).json({ message: err.message });
        }
      } catch {
        res.status(429).json({ error: "Rate limit exceeded" });
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
