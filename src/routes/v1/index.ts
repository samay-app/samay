import express, { Router } from 'express';
import poll from './poll';
import pollster from './pollster';

const router: Router = express.Router();

router.use('/poll', poll);
router.use('/pollster', pollster);

export default router;
