import express, { Request, Response, Router } from 'express';
import dayjs from 'dayjs';
import { createTransport, Transporter } from 'nodemailer';
import { email, password } from '../../config';

const router: Router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  interface Choice {
    start: number;
    end: number;
  }
  interface Data {
    senderName: string;
    senderEmailID: string;
    pollTitle: string,
    finalOption: Choice;
    receiverIDs: string[];
  }

  const data: Data = req.body;

  if (data.senderEmailID !== req.currentUser.email) {
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
        subject: `RocketMeet: ${data.pollTitle} - Final time`,
        html: `<p>The meet <b>${data.pollTitle}</b> has been scheduled on ${dayjs(data.finalOption.start).format('DD/MM/YYYY')} 
                from ${dayjs(data.finalOption.start).format('HH:mm A')} to ${dayjs(data.finalOption.end).format('HH:mm A')}
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
