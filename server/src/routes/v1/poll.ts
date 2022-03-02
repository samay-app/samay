import express, { Request, Response, Router } from 'express';
import { isChoicePresentInPollChoices, isUserPresentInVotes } from '../../helpers';
import Poll, { Vote, RocketMeetPoll } from '../../db/models/poll';
import auth from './auth';

const router: Router = express.Router();

// get a specific poll by id

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const poll: RocketMeetPoll | null = await Poll.findOne({ _id: req.params.id }).lean();
        if (!poll) {
            res.status(404).json({ message: 'Poll does not exist' });
        } else {
            res.status(200).json(poll);
        }
    } catch (err) {
        res.status(404).json({ message: 'Poll does not exist' });
    }
});

// mark choices on a public poll

router.put('/public/:id', async (req: Request, res: Response) => {
    try {
        const poll: RocketMeetPoll | null = await Poll.findOne({ _id: req.params.id });
        if (poll) {
            const vote: Vote = req.body;
            if (poll.type !== 'public') {
                res.status(400).json({ message: 'Poll is not public' });
            } else if (!poll.open) {
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
        res.status(400).json({ message: err.message });
    }
});

// all the APIs below need auth

router.use('/', auth);

// mark choices on a protected poll

router.put('/protected/:id', async (req: Request, res: Response) => {
    try {
        const poll: RocketMeetPoll | null = await Poll.findOne({ _id: req.params.id });
        if (poll) {
            const vote: Vote = req.body;
            if (poll.type !== 'protected') {
                res.status(400).json({ message: 'Poll is not protected' });
            } else if (vote.name !== req.currentUser.name) {
                res.status(403).json({ message: 'Forbidden' });
            } else if (!poll.open) {
                res.status(400).json({ message: 'Poll closed' });
            } else if (
                !vote.choices.every((choice) => isChoicePresentInPollChoices(choice, poll.choices))
                ) {
                res.status(400).json({ message: 'Invalid choices' });
            } else if (poll.votes && isUserPresentInVotes(req.currentUser.name, poll.votes)) {
                res.status(403).json({ message: 'User cannot vote more than once' });
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
        res.status(400).json({ message: err.message });
    }
});

export default router;
