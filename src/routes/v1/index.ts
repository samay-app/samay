import express, { Router } from 'express';
import meetInfo from './meetInfo';

const router: Router = express.Router();

router.use('/meetInfo', meetInfo);

export default router;
