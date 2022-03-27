import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import KukkeePoll, { PollDoc } from "../../../src/models/poll";
import connectToDatabase from "../../../src/utils/db";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<NextApiResponse | void> => {
  const session = await getSession({ req });

  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        await connectToDatabase();
        const poll: PollDoc | null = await KukkeePoll.findOne({
          _id: id,
        }).lean();
        if (!poll)
          return res.status(404).json({ message: "Poll does not exist" });
        if (poll.type === "protected" && !session)
          return res.status(401).json({ message: "User not logged in" });
        return res.status(200).json(poll);
      } catch (err) {
        return res.status(404).json({ message: err.message });
      }
    default:
      res.setHeader("Allow", ["GET"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
};
