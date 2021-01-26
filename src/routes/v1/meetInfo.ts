import express, { Request, Response, Router } from 'express';
import { createTransport, Transporter } from 'nodemailer';
import { email, password } from '../../config';

const router: Router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  
  interface Data {
    pollID: string;
    pollTitle: string;
    senderName: string;
    senderEmailID:string;
    receiverIDs: string[];
  }

  const data: Data = req.body

  if (req.body.senderEmailID !== req.currentUser.email) {
       res.status(401).json({ msg: 'Unauthorized' });
  } else {
  const transporter: Transporter = createTransport({
    service: 'gmail',
    auth: {
        user: email,
        pass: password,
    },
  });

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
