import express, { Request, Response, Router } from 'express';
import { isChoicePresentInPollChoices } from '../../helpers';
import Poll, { Vote, RocketMeetPoll } from '../../db/models/poll';

const router: Router = express.Router();

// create a new poll

router.post('/', async (req: Request, res: Response) => {
  const newPoll: RocketMeetPoll = new Poll(req.body);
  try {
    await newPoll.save();
    res.status(201).json(newPoll);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// finalize time

router.put('/:id/:secret', async (req: Request, res: Response) => {
  const poll: RocketMeetPoll | null = await Poll.findOne({ _id: req.params.id }).lean();
  if (poll) {
    if (poll.secret !== req.params.secret) {
      res.status(403).json({ message: 'Forbidden' });
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

// get a poll by id

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
    res.status(400).json({ message: err.message });
  }
});

// delete a specific poll by id

router.delete('/:id/:secret', async (req: Request, res: Response) => {
  const poll: RocketMeetPoll | null = await Poll.findOne({ _id: req.params.id }).lean();
  if (poll) {
    if (poll.secret !== req.params.secret) {
      res.status(403).json({ message: 'Forbidden' });
    } else {
      try {
        const deletedPoll = await Poll.findByIdAndRemove(req.params.id);
        res.status(200).json(deletedPoll);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    }
  } else {
    res.status(404).json({ message: 'Poll not found' });
  }
});

export default router;
