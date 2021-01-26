import express, { Request, Response, Router } from 'express';
import { createTransport, Transporter } from 'nodemailer';
import { email, password } from '../../config';

const router: Router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  if (req.body.senderName !== req.currentUser.name) {
       res.status(401).json({ msg: 'Unauthorized' });
  } else {
  const transporter: Transporter = createTransport({
    service: 'gmail',
    auth: {
        user: email,
        pass: password,
    },
  });

  interface Data {
    pollID: string;
    pollTitle: string;
    senderName: string;
    receiverIDs: string[];
  }

  const data: Data = {
    pollID: req.body.pollID,
    pollTitle: req.body.pollTitle,
    senderName: req.body.senderName,
    receiverIDs: req.body.receiverIDs,
  };

  data.receiverIDs.forEach(async (receiverID: string) => {
    const mailOptions = {
      from: `${data.senderName} <rocketmeet@gmail.com>`,
      to: receiverID,
      subject: `RocketMeet: Invitation - ${data.pollTitle}`,
      html: `<p>Hey there, ${data.senderName} has invited you to a RocketMeet poll <b>
                ${data.pollTitle},<br><br> <b> visit rocketmeet.me/poll/${data.pollID}
            </p>`,
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
}
});

export default router;
