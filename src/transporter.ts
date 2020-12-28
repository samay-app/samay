import * as nodemailer from 'nodemailer';
import { email, password } from './config';

const transporter: nodemailer.Transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: email,
        pass: password,
    },
});

export default transporter;
