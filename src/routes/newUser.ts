import express, { Request, Response, Router } from 'express';

import { transporter } from './index.js';

const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
 res.send("NewUser");   
});

router.get('/', (req: Request, res: Response) => {
    res.send("Meet Info");
  });
  router.get('/mail', (req: Request, res: Response) => {
        const mail = ["athuljoshi7@gmail.com", "athuljoshi07@gmail.com"];
        mail.forEach(element => {
        const mailOptions = {
            from: 'hello@rocketmeet.com',
            to: element,
            subject: 'Hello',
            text: "Hello there"
        };
        
        transporter.sendMail(mailOptions, (err, data) => {
          if(err) {
            res.send("mail not sent");
            console.log(err);
          } else {
            res.send("mail sent");
            console.log(data);
          }
        });
      });
  });

export default router;