import express, { Router } from 'express';
import auth from './middlewares/Auth/auth';
import finalChoice from './finalChoice';
import invite from './invite';

const router: Router = express.Router();
router.use('/', auth);
router.use('/finalChoice', finalChoice);
router.use('/invite', invite);

export default router;
