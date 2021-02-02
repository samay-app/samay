import express, { Request, Response, Router } from 'express';
import Poll from '../../db/models/poll';

const router: Router = express.Router();

// All the APIs below are public APIs

// get total number of polls

router.get('/', async (req: Request, res: Response) => {
    try {
        const pollCount = await Poll.estimatedDocumentCount();
        res.status(200).json(pollCount);
    } catch (err) {
        res.status(503).json({ message: err.message });
    }
});

export default router;
