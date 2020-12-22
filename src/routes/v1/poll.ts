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
    const toMark: MarkedProps = req.body;

    try {
        const poll: PollProps | null = await Poll.findOne({ _id: req.params.id });
        if (poll) {
            if (!toMark.choices.every((v) => poll.choices.includes(v))) {
                res.status(404).json({ message: 'Invalid choices' });
            } else {
                delete poll._id;
                if (poll.marked) {
                    const idx = poll.marked.findIndex((mark) => mark.userID === toMark.userID);
                    if (idx !== -1) {
                        poll.marked[idx].choices = toMark.choices;
                    } else {
                        poll.marked.push(toMark);
                    }
                } else {
                    const newMarked: MarkedProps[] = [{
                        userID: toMark.userID, choices: toMark.choices,
                    }];
                    poll.marked = newMarked;
                }
                await Poll.updateOne({ _id: req.params.id }, poll);
                res.status(201).json(poll);
                }
        } else {
            res.status(404).json({ message: 'Poll does not exist' });
        }
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

export default router;
