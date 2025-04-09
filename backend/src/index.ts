import express from 'express';
import session from 'express-session';
import https from 'http';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import compression from 'compression';
import cors from 'cors';
import router from '@app/router';
import config from '@app/config/config';
import { Logger } from '@app/utils/Logger';
import { connectDB } from '@app/config/db';
import passport from '@app/config/auth/oauth';

Logger.enableDebug();

const app = express();

app.use(cors({
    origin: `http://${config.client.host}:${config.client.port}`,
    credentials: true,
}));

app.use(compression());
app.use(bodyParser.json());

app.use(session({
    secret: config.appSecret,
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

const server = https.createServer(app);

dotenv.config();

connectDB();

server.listen(config.server.port, () => {
    Logger.info(`Server running on http://${config.server.host}:${config.server.port}/`);
});

app.use('/', router());