import express, { Router } from 'express';
import poll from './poll.js';
import signup from './access/signup.js';
import login from './access/login.js';
import logout from './access/logout.js';

const router: Router = express.Router();

router.use('/poll', poll);
router.use('/login', login);
router.use('/logout', logout);
router.use('/signup', signup);

export default router;
