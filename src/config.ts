import dotenv from 'dotenv';

dotenv.config();

export const environment: string = process.env.NODE_ENV || 'development';
export const port: string = process.env.PORT || '5000';
export const logLevel: string = process.env.LOG_LEVEL || 'info';

export const db = {
  name: process.env.DB_NAME || '',
  host: process.env.DB_HOST || '',
  user: process.env.DB_USER || '',
  password: process.env.DB_USER_PWD || '',
};

export const corsUrl: string = process.env.CORS_URL || '';

export const connectionURL = `mongodb+srv://${db.user}:${encodeURIComponent(db.password)}@${db.host}.aewjs.mongodb.net/${db.name}?retryWrites=true&w=majority`;
