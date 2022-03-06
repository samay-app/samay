import express, { Router } from 'express';
import poll from './poll';

const router: Router = express.Router();

router.use('/poll', poll);

export default router;
