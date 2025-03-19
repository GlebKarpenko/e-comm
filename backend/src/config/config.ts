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

const config = {
    mysql: MYSQL,
    server: SERVER
}

export default config;