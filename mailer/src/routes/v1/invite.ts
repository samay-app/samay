import express, { Request, Response, Router } from 'express';
import fs from 'fs';
import * as handlebars from 'handlebars';
import path from 'path';
import { createTransport, Transporter } from 'nodemailer';
import { email, password } from '../../config';

const router: Router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  interface Data {
    pollID: string;
    pollTitle: string;
    senderName: string;
    senderEmailID: string;
    receiverIDs: string[];
  }

  const data: Data = req.body;

  if (data.senderEmailID !== req.currentUser.email) {
    res.status(403).json({ msg: 'Forbidden' });
    } else {
    const filePath = path.join(__dirname, '../../../template/invite.html');
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    const template = handlebars.compile(source);
    const replacements = {
      senderName: data.senderName,
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
        subject: `RocketMeet: Invitation - ${data.pollTitle}`,
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
