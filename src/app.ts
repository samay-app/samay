import cors from 'cors';
import express, { Application } from 'express';
import { corsUrl, port } from './config.js';
import routesV1 from './routes/v1/index.js';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));

app.use('/v1', routesV1);

app.listen(port);
