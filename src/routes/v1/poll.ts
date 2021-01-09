import express, { Request, Response, Router } from 'express';
import isChoicePresentInPollChoices from '../../helpers';
import Poll, { Vote, RocketMeetPoll } from '../../db/models/poll';

const router: Router = express.Router();

// All the APIs below are public APIs

// get a specific poll with the id

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const poll: RocketMeetPoll | null = await Poll.findOne({ _id: req.params.id }).lean();
        res.status(200).json(poll);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

// mark choices on a poll

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const poll: RocketMeetPoll | null = await Poll.findOne({ _id: req.params.id });
        if (poll) {
            const vote: Vote = req.body;
            if (!poll.open) {
                res.status(400).json({ message: 'Poll closed' });
            } else if (
                !vote.choices.every((choice) => isChoicePresentInPollChoices(choice, poll.choices))
                ) {
                res.status(400).json({ message: 'Invalid choices' });
            } else {
                const currentVotes: Vote[] | undefined = poll.votes;
                let newVotes: Vote[] | undefined;

                if (currentVotes && currentVotes?.length > 0) {
                    newVotes = currentVotes;
                    newVotes.push(vote);
                } else {
                    newVotes = [{
                        name: vote.name, choices: vote.choices,
                    }];
                }
                const updatedPoll: RocketMeetPoll | null = await Poll.findOneAndUpdate(
                    { _id: req.params.id },
                    { votes: newVotes },
                    { new: true },
                );
                res.status(201).json(updatedPoll);
            }
        } else {
            res.status(404).json({ message: 'Poll does not exist' });
        }
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
});

export default router;
