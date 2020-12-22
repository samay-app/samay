import express, { Router } from 'express';
import * as nodemailer from 'nodemailer';

import meetInfo from './meetInfo.js';
import newUser from './newUser.js'; 
import { email, pass } from '../config.js';

const router: Router = express.Router();
const transporter: nodemailer.Transporter = nodemailer.createTransport({ 
    service: 'gmail',
    auth: {
      user: email,
      pass: pass
    } 
  }); 
  
router.use('/meetInfo', meetInfo);
router.use('/newUser', newUser);

router.get('/', (req, res) => {
    res.send('routes');
});

export {router, transporter};
