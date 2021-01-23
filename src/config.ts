import dotenv from 'dotenv';

dotenv.config();

export const environment: string = process.env.NODE_ENV || 'production';
export const corsUrl: string = process.env.CORS_URL || '';
export const port: number = parseInt(<string>process.env.PORT, 10) || 5000;
export const loggerLevel: string = process.env.LOGGER_LEVEL || 'info';

export const email: string = process.env.EMAIL || '';
export const password: string = process.env.PASSWORD || '';
