import express, { Request, Response, Router } from 'express';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { createTransport, Transporter } from 'nodemailer';
import { email, password } from '../../config';

dayjs.extend(localizedFormat);

const router: Router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  interface Choice {
    start: number;
    end: number;
  }
  interface Data {
    senderName: string;
    senderEmailID: string;
    pollTitle: string;
    finalChoice: Choice;
    receiverIDs: string[];
  }

  const data: Data = req.body;

  if (data.senderEmailID !== req.currentUser.email) {
    res.status(403).json({ msg: 'Forbidden' });
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
        from: `${data.senderName} <${email}>`,
        to: receiverID,
        subject: `RocketMeet: ${data.pollTitle} - Final time`,
        replyTo: `${data.senderName} <${data.senderEmailID}>`,
        html: `<p>The meet <b>${data.pollTitle}</b> has been scheduled on ${dayjs(data.finalChoice.start).format('DD/MM/YYYY')} 
                from ${dayjs(data.finalChoice.start).format('LT')} to ${dayjs(data.finalChoice.end).format('LT')}
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
