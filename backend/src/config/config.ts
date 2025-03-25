import dotenv from 'dotenv';

dotenv.config();

const SERVER_PORT = process.env.PORT || 8081;
const SERVER_HOST = process.env.HOST || 'localhost'

const SERVER = {
    host: SERVER_HOST,
    port: SERVER_PORT
}

const MYSQL_HOST = process.env.MYSQL_HOST || 'localhost';
const MYSQL_USER = process.env.MYSQL_USER || 'root';
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || '';
const MYSQL_DATABASE = process.env.MYSQL_DB || 'e-comm_store';

const MYSQL = {
    host: MYSQL_HOST,
    database: MYSQL_DATABASE,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD
}

const OAUTH20= {
    clientID: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    google: {
        oauthUrl: process.env.GOOGLE_OAUTH_URL,
        accessTokenUrl: process.env.GOOGLE_ACCESS_TOKEN_URL,
        tokenInfoUrl: process.env.GOOGLE_TOKEN_INFO_URL
    }
}

const config = {
    mysql: MYSQL,
    server: SERVER,
    oauth: OAUTH20,
    appSecret: process.env.APP_SECRET_KEY
}

export default config;