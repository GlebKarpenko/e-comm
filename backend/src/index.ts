import express from 'express';
import https from 'http';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import compression from 'compression';
import cors from 'cors';

import router from '@app/router';
import { Logger } from './utils/Logger';
import { connectDB } from './config/db';

Logger.enable();

const app = express();

app.use(cors({
    origin: 'http://localhost:8081',
    credentials: true,
}));

app.use(compression());
app.use(bodyParser.json());

const server = https.createServer(app);

dotenv.config();

connectDB();

const port = process.env.PORT;
const host = process.env.HOST;

server.listen(port, () => {
    Logger.log(`Server running on ${host}${port}/`);
});

app.use('/', router())