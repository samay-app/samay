export const environment = process.env.NODE_ENV;
export const port = process.env.PORT || 5000;

export const db = {
  name: process.env.DB_NAME || '',
  host: process.env.DB_HOST || '',
  port: process.env.DB_PORT || '',
  user: process.env.DB_USER || '',
  password: process.env.DB_USER_PWD || '',
};

export const corsUrl = process.env.CORS_URL;
