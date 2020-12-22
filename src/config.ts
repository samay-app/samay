import dotenv from 'dotenv';

dotenv.config();

export const corsUrl = process.env.CORS_URL;
export const port = process.env.PORT || 8080;
export const email = process.env.EMAIL;
export const pass = process.env.PASSWORD;