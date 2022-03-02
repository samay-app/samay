import pino, { Logger } from 'pino';
import { loggerLevel, port } from './config';
import app from './app';

const logger: Logger = pino({ level: loggerLevel });

app.listen(port, () => {
        logger.info(`Server running on port: ${port}`);
    }).on('error', (err) => logger.error(err));
