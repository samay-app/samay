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
    case "POST":
      try {
        if (!session)
          return res.status(401).json({ message: "User not logged in" });
        const body = JSON.parse(req.body);
        if (session.username !== body.username) return res.status(403);
        await connectToDatabase();
        const newPoll: PollDoc = new KukkeePoll(body);
        await newPoll.save();
        return res.status(201).json(newPoll);
      } catch (err) {
        return res.status(400).json({ message: err.message });
      }
    default:
      res.setHeader("Allow", ["POST"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
};
