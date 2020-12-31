// const firebase = require("firebase-admin");
 import express, { Request, Response, NextFunction, Application } from 'express';
import firebase from 'firebase-admin';
import cors from 'cors';
// need to add the firebase admin sdk here

declare module 'express-serve-static-core' {
  interface Request {
    currentUser: string | any
  }
}
const app: Application = express();
app.use(cors({ origin: true }));

async function auth(req: Request, res: Response, next: NextFunction):Promise<void> {
   const headerToken = req.headers?.authorization;
  if (headerToken?.startsWith('Bearer ')) {
    const idToken = headerToken.split('Bearer ')[1];

    try {
      const decodedToken = await firebase.auth().verifyIdToken(idToken);
      req.currentUser = decodedToken;
      res.json({ msg: 'User Authorized' });
    } catch (err) {
      res.json({ msg: err.message });
    }
  } else {
    res.json({ msg: 'Token does not exist ' });
  }
  next();
}

export default auth;
