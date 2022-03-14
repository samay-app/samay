import { NextApiRequest, NextApiResponse } from "next";
import RocketMeetPoll, { PollDoc } from "../../../../../src/models/poll";
import rateLimit from "../../../../../src/utils/rate-limit";
import connectToDatabase from "../../../../../src/utils/db";

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const {
    query: { id, secret },
    method,
    body,
  } = req;

  switch (method) {
    case "PUT":
      try {
        await limiter.check(res, 10, "CACHE_TOKEN");
        try {
          await connectToDatabase();
          const poll: PollDoc | null = await RocketMeetPoll.findOne({
            _id: id,
          }).lean();
          if (poll) {
            if (poll.secret !== secret) {
              res.status(403).json({ message: "Forbidden" });
            } else {
              try {
                const updatedPoll: PollDoc | null = await RocketMeetPoll.findOneAndUpdate(
                  { _id: id },
                  JSON.parse(body),
                  { new: true }
                );
                res.status(201).json(updatedPoll);
              } catch (err) {
                res.status(400).json({ message: err.message });
              }
            }
          } else {
            res.status(404).json({ message: "Poll not found" });
          }
        } catch (err) {
          res.status(400).json({ message: err.message });
        }
      } catch {
        res.status(429).json({ error: "Rate limit exceeded" });
      }
      break;
    case "DELETE":
      try {
        await limiter.check(res, 10, "CACHE_TOKEN");
        try {
          await connectToDatabase();
          const poll: PollDoc | null = await RocketMeetPoll.findOne({
            _id: id,
          }).lean();
          if (poll) {
            if (poll.secret !== secret) {
              res.status(403).json({ message: "Forbidden" });
            } else {
              try {
                const deletedPoll = await RocketMeetPoll.findByIdAndRemove(id);
                res.status(200).json(deletedPoll);
              } catch (err) {
                res.status(400).json({ message: err.message });
              }
            }
          } else {
            res.status(404).json({ message: "Poll not found" });
          }
        } catch (err) {
          res.status(400).json({ message: err.message });
        }
      } catch {
        res.status(429).json({ error: "Rate limit exceeded" });
      }
      break;
    default:
      res.setHeader("Allow", ["PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
