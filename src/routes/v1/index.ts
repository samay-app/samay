import express, { Router } from 'express';
import poll from './poll';
import user from './user';
import pollCount from './pollCount';

const router: Router = express.Router();

router.use('/poll', poll);
router.use('/user', user);
router.use('/pollCount', pollCount);

export default router;
