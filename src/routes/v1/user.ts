import express, { Request, Response, Router } from 'express';
import Poll, { PollProps } from '../../db/models/poll';

const router: Router = express.Router();

// All the APIs below are private APIs protected for user's role

// get all polls created by an user id

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const polls: PollProps[] | null = await Poll.find({ userID: req.params.id });
        res.status(200).json(polls);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

// create a new poll

router.post('/poll', async (req: Request, res: Response) => {
    const newPoll: PollProps = new Poll(req.body);

    try {
        await newPoll.save();
        res.status(201).json(newPoll);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
});

// update a poll

router.put('/poll/:id', async (req: Request, res: Response) => {
    const newPoll: PollProps = new Poll(req.body);

    try {
        const poll: PollProps | null = await Poll.findOne({ _id: req.params.id });
        if (poll) {
            delete poll._id;
            poll.pollName = newPoll.pollName;
            poll.interval = newPoll.interval;
            poll.choices = newPoll.choices;
            await Poll.updateOne({ _id: req.params.id }, poll);
            res.status(201).json(poll);
        } else {
            res.status(404).json({ message: 'Poll does not exist' });
        }
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

// delete a specific poll with the id

router.delete('/poll/:id', async (req: Request, res: Response) => {
    try {
        const deletedPoll = await Poll.findByIdAndRemove(req.params.id);
        if (deletedPoll) {
            res.status(200).json(deletedPoll);
        } else {
            res.status(404).json({ message: 'Poll does not exist' });
        }
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

export default router;
