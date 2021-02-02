import express, { Request, Response, Router } from 'express';
import dayjs from 'dayjs';
import fs from 'fs';
import * as handlebars from 'handlebars';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import path from 'path';
import { createTransport, Transporter } from 'nodemailer';
import { email, password } from '../../config';

dayjs.extend(localizedFormat);

const router: Router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  interface Data {
    senderName: string;
    senderEmailID: string;
    pollTitle: string;
    pollID: string;
    receiverIDs: string[];
  }

  const data: Data = req.body;

  if (data.senderEmailID !== req.currentUser.email) {
    res.status(403).json({ msg: 'Forbidden' });
  } else {
    const filePath = path.join(__dirname, '../../../template/finalChoice.html');
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    const template = handlebars.compile(source);
    const replacements = {
      pollID: data.pollID,
      pollTitle: data.pollTitle,
    };
    const htmlToSend = template(replacements);
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
        html: htmlToSend,
        attachments: [
          {
            filename: 'logo.png',
            path: `${__dirname}/../../../template/images/logo.png`,
            cid: 'logo',
          },
        ],
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
