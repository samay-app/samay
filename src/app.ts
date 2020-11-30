import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Application, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose'

const app: Application = express();

app.get('/', (req: Request, res: Response) => {
    res.send('Hello');
});

app.listen(5000, () => console.log('Server is running!'));
