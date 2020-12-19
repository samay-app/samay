import pino, { Logger } from 'pino';
import { logLevel, port } from './config.js';
import app from './app.js';

const logger: Logger = pino({ level: logLevel });

app
    .listen(port, () => {
        logger.info(`Server running on port: ${port}`);
    })
    .on('error', (err) => logger.error(err));
