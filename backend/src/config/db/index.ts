import mysql from 'mysql2';
import config from '@app/config/config';
import { Logger } from '../Logger';

const pool = mysql.createPool(config.mysql).promise();

export const connectDB = async () => {
    try {
        const [rows] = await pool.query("SELECT DATABASE() AS db_name");
        const dbName = (rows as mysql.RowDataPacket[])[0]?.db_name || 'Unknown';
        Logger.info(`Connected to database: ${dbName}`);
    } catch (error) {
        Logger.error(`Could not connect to database.`, 'DATABASE', error);
    }
}