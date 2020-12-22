import cors from 'cors';
import express, {Application} from 'express';

import { port } from './config.js';
import { router } from './routes/index.js';

const app: Application = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cors({optionsSuccessStatus: 200 }));

app.use('/', router);
 
app.listen(port, () => {
    console.log(port);
});