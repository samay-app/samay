import express, { Request, Response, Router } from 'express';
import { decrypt } from '../../helpers';
import Poll, { RocketMeetPoll } from '../../db/models/poll';
import auth from './auth/auth';

const router: Router = express.Router();

// All the APIs below are private APIs protected for user's role
router.use('/', auth);

// get all polls created by emailID

router.get('/:encryptedEmailID', async (req: Request, res: Response) => {
    if (decrypt(req.params.encryptedEmailID) !== req.currentUser.email) {
        res.status(401).json({ msg: 'Unauthorized' });
    } else {
        try {
            const polls: RocketMeetPoll[] | null = await Poll.find({
                encryptedEmailID: req.params.encryptedEmailID,
            }).lean();
            res.status(200).json(polls);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
});

// create a new poll

router.post('/poll', async (req: Request, res: Response) => {
    if (decrypt(req.body.encryptedEmailID) !== req.currentUser.email) {
        res.status(401).json({ msg: 'Unauthorized' });
    } else {
        const newPoll: RocketMeetPoll = new Poll(req.body);

        try {
            await newPoll.save();
            res.status(201).json(newPoll);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
});

// update a poll

router.put('/poll/:id', async (req: Request, res: Response) => {
    const poll: RocketMeetPoll | null = await Poll.findOne({ _id: req.params.id }).lean();
    if (poll) {
        if (decrypt(poll.encryptedEmailID) !== req.currentUser.email) {
            res.status(401).json({ msg: 'Unauthorized' });
        } else {
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
        }
    } else {
        res.status(404).json({ message: 'Poll not found' });
    }
});

// delete a specific poll with the id

router.delete('/poll/:id', async (req: Request, res: Response) => {
    const poll: RocketMeetPoll | null = await Poll.findOne({ _id: req.params.id }).lean();
    if (poll) {
        if (decrypt(poll.encryptedEmailID) !== req.currentUser.email) {
            res.status(401).json({ msg: 'Unauthorized' });
        } else {
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
        }
    } else {
        res.status(404).json({ message: 'Poll not found' });
    }
});

export default router;
