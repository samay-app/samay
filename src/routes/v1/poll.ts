import express, { Request, Response, Router } from 'express';
import Poll, { MarkedProps, PollProps } from '../../db/models/poll';

const router: Router = express.Router();

// All the APIs below are public APIs

// get a specific poll with the id

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const poll: PollProps | null = await Poll.findOne({ _id: req.params.id });
        res.status(200).json(poll);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

// mark choices on a poll

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const poll: PollProps | null = await Poll.findOne({ _id: req.params.id });
        if (poll) {
            const valuesToMark: MarkedProps = req.body;
            if (!poll.open) {
                res.status(400).json({ message: 'Poll closed' });
            } else if (!valuesToMark.choices.every((v) => poll.choices.includes(v))) {
                res.status(400).json({ message: 'Invalid choices' });
            } else {
                const currentlyMarked: MarkedProps[] | undefined = poll.marked;
                let toMarkOnPoll: MarkedProps[] | undefined;

                if (currentlyMarked) {
                    toMarkOnPoll = currentlyMarked;
                    toMarkOnPoll.push(valuesToMark);
                } else {
                    toMarkOnPoll = [{
                        userID: valuesToMark.userID, choices: valuesToMark.choices,
                    }];
                }
                const markedPoll: PollProps | null = await Poll.findOneAndUpdate(
                    { _id: req.params.id },
                    { marked: toMarkOnPoll },
                    { new: true },
                );
                res.status(201).json(markedPoll);
            }
        } else {
            res.status(404).json({ message: 'Poll does not exist' });
        }
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
});

export default router;
