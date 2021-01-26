import express, { Router } from 'express';
import auth from './middlewares/Auth/auth';
import finalOption from './finalOption';
import meetInfo from './meetInfo';

const router: Router = express.Router();
router.use('/', auth);
router.use('/finalOption', finalOption);
router.use('/meetInfo', meetInfo);

export default router;
