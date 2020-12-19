import mongoose, { ConnectionOptions } from 'mongoose';
import pino, { Logger } from 'pino';
import { connectionURL, logLevel } from '../config.js';

const logger: Logger = pino({ level: logLevel });

const options: ConnectionOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    autoIndex: true,
};

// Create the database connection
mongoose
    .connect(connectionURL, options)
    .then(() => { logger.info('Mongoose connection successfull'); })
    .catch((err) => logger.error(err.message));

// CONNECTION EVENTS

// When successfully connected
mongoose.connection.on('connected', () => {
    logger.info(`Mongoose default connection open to: ${connectionURL}`);
});

// If the connection throws an error
mongoose.connection.on('error', (err) => {
    logger.error(err.message);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
    logger.info('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        logger.info('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});
