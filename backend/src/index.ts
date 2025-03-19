import express from 'express';
import https from 'http';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import compression from 'compression';
import cors from 'cors';
import router from '@app/router';
import config from './config/config';
import { Logger } from './config/Logger';
import { connectDB } from './config/db';

Logger.enableDebug();

const app = express();

app.use(cors({
    origin: `http://${config.server.host}:${config.server.port}`,
    credentials: true,
}));

app.use(compression());
app.use(bodyParser.json());

const server = https.createServer(app);

dotenv.config();

connectDB();

server.listen(config.server.port, () => {
    Logger.info(`Server running on http://${config.server.host}:${config.server.port}/`);
});

app.use('/', router())