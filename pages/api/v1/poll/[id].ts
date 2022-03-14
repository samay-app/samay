import { NextApiRequest, NextApiResponse } from "next";
import RocketMeetPoll, { Vote, PollDoc } from "../../../../src/models/poll";
import { isChoicePresentInPollChoices } from "../../../../src/helpers";
import connectToDatabase from "../../../../src/utils/db";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const {
    query: { id },
    method,
    body,
  } = req;

  switch (method) {
    case "GET":
      try {
        await connectToDatabase();
        const poll: PollDoc | null = await RocketMeetPoll.findOne({
          _id: id,
        }).lean();
        if (!poll) {
          res.status(404).json({ message: "Poll does not exist" });
        } else {
          res.status(200).json(poll);
        }
      } catch (err) {
        res.status(404).json({ message: err.message });
      }
      break;
    case "PUT":
      try {
        await connectToDatabase();
        const poll: PollDoc | null = await RocketMeetPoll.findOne({
          _id: id,
        });
        if (poll) {
          const vote: Vote = JSON.parse(body);
          if (!poll.open) {
            res.status(400).json({ message: "Poll closed" });
          } else if (
            !vote.choices.every((choice) =>
              isChoicePresentInPollChoices(choice, poll.choices)
            )
          ) {
            res.status(400).json({ message: "Invalid choices" });
          } else {
            const currentVotes: Vote[] | undefined = poll.votes;
            let newVotes: Vote[] | undefined;

            if (currentVotes && currentVotes?.length > 0) {
              newVotes = currentVotes;
              newVotes.push(vote);
            } else {
              newVotes = [
                {
                  name: vote.name,
                  choices: vote.choices,
                },
              ];
            }
            const updatedPoll: PollDoc | null = await RocketMeetPoll.findOneAndUpdate(
              { _id: id },
              { votes: newVotes },
              { new: true }
            );
            res.status(201).json(updatedPoll);
          }
        } else {
          res.status(404).json({ message: "Poll does not exist" });
        }
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
