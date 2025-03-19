import mysql from 'mysql2/promise';
import { Logger } from '@app/config/Logger';

export const connectDB = async (): Promise<void> => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DB
        });

        const [rows] = await connection.execute('SELECT DATABASE() AS db_name');
        const dbName = (rows as mysql.RowDataPacket[])[0]?.db_name || 'Unknown';

        Logger.info(`Connected to database: ${dbName}`);

        await connection.end();
    } catch (error) {
        Logger.error("Database connection failed: ", error);
    }
}