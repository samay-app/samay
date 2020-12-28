import express, { Request, Response, Router } from 'express';
import transporter from '../transporter';

const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Meet Info');
});

router.get('/mail', (req: Request, res: Response) => {
  const mail = req.body.mails;
  const id = req.body.id;

  mail.forEach((element: string) => {
    const mailOptions = {
        from: 'hello@rocketmeet.com',
        to: element,
        subject: 'Hello',
        html: `<p>url.com/${id}</p>`,
    };

    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
      res.status(404).json(err);
      // console.log(err);
      } else {
        res.status(200).json({
          sent: true,
        id: data.messageId });
        // console.log(data);
    }
    });
  });
});

export default router;
