import express, { Request, Response, Router } from 'express';
import { createTransport, Transporter } from 'nodemailer';
import { email, password } from '../../config';

const router: Router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const transporter: Transporter = createTransport({
    service: 'gmail',
    auth: {
        user: email,
        pass: password,
    },
  });

  interface Data {
    pollID: string;
    senderID: string;
    receiverIDs: string[];
  }

  const data: Data = {
    pollID: req.body.pollID,
    senderID: req.body.senderID,
    receiverIDs: req.body.receiverIDs,
  };

  data.receiverIDs.forEach(async (receiverID: string) => {
    const mailOptions = {
      from: data.senderID,
      to: receiverID,
      subject: 'RocketMeet',
      html: `<p>Hey there, ${data.senderID} has invited you to a RocketMeet poll, <b> visit url.com/${data.pollID}</p>`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
      res.status(404).json(err);
      } else {
          res.status(200).json({
            sent: true,
            id: info.messageId,
          });
        }
    });
  });
});

export default router;
