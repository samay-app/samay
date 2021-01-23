import admin from 'firebase-admin';
import firebaseAccountCredentials from './config/service-account-credentials.json';

const serviceAccount = firebaseAccountCredentials as admin.ServiceAccount;
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
