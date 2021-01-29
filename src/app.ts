import express, { Application } from 'express';
import expressPino, { HttpLogger } from 'express-pino-logger';
import pino, { Logger } from 'pino';
import { logLevel } from './config';
import './db/index'; // initialize database
import routesV1 from './routes/v1/index';

const logger: Logger = pino({ level: logLevel });
const expressLogger: HttpLogger = expressPino({ logger });

const app: Application = express();

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'https://rocketmeet.me');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-Requested-With,X-Custom-Header');
    res.setHeader('Access-Control-Allow-Credentials', true);
    if ('OPTIONS' === req.method) {
      res.sendStatus(200);
    }
    else {
      next();
    }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
    app.use(expressLogger);
}

app.use('/v1', routesV1);

export default app;
