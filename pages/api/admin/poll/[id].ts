import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import KukkeePoll, { PollDoc } from "../../../../src/models/poll";
import connectToDatabase from "../../../../src/utils/db";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<NextApiResponse | void> => {
  const session = await getSession({ req });

  const {
    query: { id },
    method,
    body,
  } = req;

  switch (method) {
    case "PUT":
      try {
        if (!session)
          return res.status(401).json({ message: "User not logged in" });
        await connectToDatabase();
        const poll: PollDoc | null = await KukkeePoll.findOne({
          _id: id,
        }).lean();
        if (poll) {
          if (session.username !== poll.username) {
            return res.status(403).json({ message: "Forbidden" });
          }
          try {
            const updatedPoll: PollDoc | null = await KukkeePoll.findOneAndUpdate(
              { _id: id },
              JSON.parse(body),
              { new: true }
            );
            return res.status(201).json(updatedPoll);
          } catch (err) {
            return res.status(400).json({ message: err.message });
          }
        } else {
          return res.status(404).json({ message: "Poll not found" });
        }
      } catch (err) {
        return res.status(400).json({ message: err.message });
      }
    case "DELETE":
      try {
        if (!session)
          return res.status(401).json({ message: "User not logged in" });
        await connectToDatabase();
        const poll: PollDoc | null = await KukkeePoll.findOne({
          _id: id,
        }).lean();
        if (poll) {
          if (session.username !== poll.username) {
            return res.status(403).json({ message: "Forbidden" });
          }
          try {
            const deletedPoll = await KukkeePoll.findByIdAndRemove(id);
            return res.status(200).json(deletedPoll);
          } catch (err) {
            return res.status(400).json({ message: err.message });
          }
        } else {
          return res.status(404).json({ message: "Poll not found" });
        }
      } catch (err) {
        return res.status(400).json({ message: err.message });
      }
    default:
      res.setHeader("Allow", ["PUT", "DELETE"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
};
