import express, { Request, Response, Router } from 'express';
import Poll, { RocketMeetPoll } from '../../db/models/poll';

const router: Router = express.Router();

// All the APIs below are private APIs protected for user's role
// @Aravind: make sure users are authorized properly and can't imitate other users

// get all polls created by an emailID

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const polls: RocketMeetPoll[] | null = await Poll.find({ emailID: req.params.id });
        res.status(200).json(polls);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

// create a new poll

router.post('/poll', async (req: Request, res: Response) => {
    const newPoll: RocketMeetPoll = new Poll(req.body);

    try {
        await newPoll.save();
        res.status(201).json(newPoll);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// update a poll

router.put('/poll/:id', async (req: Request, res: Response) => {
    try {
        const updatedPoll: RocketMeetPoll | null = await Poll.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true },
        );
        res.status(201).json(updatedPoll);
    } catch (err) {
        res.status(400).json({ message: err.message });
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
        res.status(503).json({ message: err.message });
    }
});

export default router;
