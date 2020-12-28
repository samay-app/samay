import express, { Router } from 'express';

import meetInfo from './meetInfo';
// import newUser from './newUser';

const router: Router = express.Router();
router.use('/meetInfo', meetInfo);
// router.use('/newUser', newUser);

router.get('/', (req, res) => {
    res.send('routes');
});

export default router;
