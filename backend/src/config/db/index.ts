import mysql from 'mysql2';
import config from '@app/config/config';
import { Logger } from '../Logger';

export const pool = mysql.createPool(config.mysql).promise();

export const connectDB = async () => {
    try {
        const [rows] = await pool.query("SELECT DATABASE() AS db_name");
        const dbName = (rows as mysql.RowDataPacket[])[0]?.db_name || 'Unknown';
        Logger.info(`Connected to database: ${dbName}`);
    } catch (error) {
        Logger.error(`Could not connect to database.`, 'DATABASE', error);
    }
}

export const executeQuery = async <T=any>(query: string, params: any[] = []): Promise<T> => {
    try {
        const [result] = await pool.query(query, params);
        return result as T;
    } catch (error) {
        Logger.error(`Could not execute query.`, 'DATABASE', error);
        throw new Error(`Database operation failed. ${error}`);
    }
}