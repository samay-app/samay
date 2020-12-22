import cors from 'cors';
import express, { Application } from 'express';
import expressPino, { HttpLogger } from 'express-pino-logger';
import pino, { Logger } from 'pino';
import { corsUrl, logLevel } from './config';
import './db/index'; // initialize database
import routesV1 from './routes/v1/index';

const logger: Logger = pino({ level: logLevel });
const expressLogger: HttpLogger = expressPino({ logger });

const app: Application = express();

if (process.env.NODE_ENV === 'development') {
    app.use(expressLogger);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));

app.use('/v1', routesV1);

export default app;
