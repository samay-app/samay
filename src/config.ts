import dotenv from 'dotenv';

dotenv.config();

export const environment: string = process.env.NODE_ENV || 'development';
export const port: number = parseInt(<string>process.env.PORT, 10) || 5000;
export const logLevel: string = process.env.LOG_LEVEL || 'info';

export const db = {
  name: process.env.DB_NAME || '',
  host: process.env.DB_HOST || '',
  user: process.env.DB_USER || '',
  password: process.env.DB_USER_PWD || '',
};

export const corsURL: string = process.env.CORS_URL || '';

const devConnectionURL = `mongodb://localhost:27017/${db.name}`;
const prodConnectionURL = `mongodb+srv://${db.user}:${encodeURIComponent(db.password)}@${db.host}.aewjs.mongodb.net/${db.name}?retryWrites=true&w=majority`;

export const connectionURL: string = environment === 'production' ? prodConnectionURL : devConnectionURL;
