import cors from 'cors';
import express, { Application } from 'express';
import expressPino, { HttpLogger } from 'express-pino-logger';
import helmet from 'helmet';
import pino, { Logger } from 'pino';
import { loggerLevel, corsURL } from './config';
import router from './routes/v1/index';

const logger: Logger = pino({ level: loggerLevel });
const expressLogger: HttpLogger = expressPino({ logger });

const app: Application = express();

app.use(helmet());

app.use(cors({ origin: corsURL, credentials: true, optionsSuccessStatus: 200 }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
    app.use(expressLogger);
}

app.use('/v1', router);

export default app;
