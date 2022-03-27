import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import KukkeePoll, { PollDoc } from "../../../../src/models/poll";
import connectToDatabase from "../../../../src/utils/db";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<NextApiResponse | void> => {
  const session = await getSession({ req });

  const { method } = req;

  switch (method) {
    case "GET":
      try {
        if (!session)
          return res.status(401).json({ message: "User not logged in" });
        await connectToDatabase();
        const polls: PollDoc[] | null = await KukkeePoll.find({
          username: session.username,
        }).lean();
        return res.status(200).json(polls);
      } catch (err) {
        return res.status(400).json({ message: err.message });
      }
    default:
      res.setHeader("Allow", ["GET"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
};
