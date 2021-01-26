import express, { Router } from 'express';
import finalOption from './finalOption';
import meetInfo from './meetInfo';

const router: Router = express.Router();

router.use('/finalOption', finalOption);
router.use('/meetInfo', meetInfo);

export default router;
