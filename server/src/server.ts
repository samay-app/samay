import pino, { Logger } from 'pino';
import { logLevel, port } from './config';
import app from './app';

const logger: Logger = pino({ level: logLevel });

app
    .listen(port, () => {
        logger.info(`Server running on port: ${port}`);
    })
    .on('error', (err) => logger.error(err));
