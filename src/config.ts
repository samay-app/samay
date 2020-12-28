import dotenv from 'dotenv';

dotenv.config();

export const corsUrl = process.env.CORS_URL;
export const port = process.env.PORT || 8080;
export const email = process.env.EMAIL;
export const password = process.env.PASSWORD;
export const loggerLevel = process.env.LOGGER_LEVEL;
