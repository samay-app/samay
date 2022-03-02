import express, { Router } from 'express';
import auth from './middlewares/Auth/auth';
import finalChoice from './finalChoice';
import invite from './invite';
import pollResponse from './pollResponse';

const router: Router = express.Router();
router.use('/', auth);
router.use('/finalChoice', finalChoice);
router.use('/invite', invite);
router.use('/pollResponse', pollResponse);

export default router;
