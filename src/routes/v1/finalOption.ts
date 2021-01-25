import express, { Request, Response, Router } from 'express';
import dayjs from 'dayjs';
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

  interface Choice {
      start: number;
      end: number;
  }

  interface Data {
    senderName: string,
    finalOption: Choice;
    receiverIDs: string[];
  }

  const data: Data = {
    senderName: req.body.senderName,
    finalOption: req.body.finalOption,
    receiverIDs: req.body.receiverIDs,
  };

  data.receiverIDs.forEach(async (receiverID: string) => {
    const mailOptions = {
      from: data.senderName,
      to: receiverID,
      subject: `Final Option: RocketMeet poll - ${data.senderName}`,
      html: `<p>The meet has been scheduled on ${dayjs(data.finalOption.start).format('DD/MM/YYYY')} 
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
});

export default router;
