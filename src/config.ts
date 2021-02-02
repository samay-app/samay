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

export const publicEncryptionKey: string = process.env.PUBLIC_ENCRYPTION_KEY || '';
export const publicEncryptionIV: string = process.env.PUBLIC_ENCRYPTION_IV || '';

interface ServiceAccount {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
}

export const firebaseAccountCredentials: ServiceAccount = {
  type: process.env.TYPE || '',
  project_id: process.env.PROJECT_ID || '',
  private_key_id: process.env.PRIVATE_KEY_ID || '',
  private_key: process.env.PRIVATE_KEY?.replace(/\\n/g, '\n') || '',
  client_email: process.env.CLIENT_EMAIL || '',
  client_id: process.env.CLIENT_ID || '',
  auth_uri: process.env.AUTH_URI || '',
  token_uri: process.env.TOKEN_URI || '',
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL || '',
  client_x509_cert_url: process.env.CLIENT_X509_CERT_URL || '',
};

export const webAPIKey: string = process.env.WEB_API_KEY || '';
