import mysql from 'mysql2';
import config from '@app/config/config';
import { Logger } from '../../utils/Logger';
import { TableIds, Tables } from '@app/interfaces/tables';

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
        Logger.debug(`Failed query:`, "DATABASE", query);
        throw new Error(`Database operation failed. ${error}`);
    }
}

export const getAll = async <T=any>(table: Tables): Promise<T[]> => {
    return executeQuery<T[]>(
        `SELECT * FROM \`${table}\``
    );
}

export const getById = async <T=any>(id: number, table: Tables): Promise<T> => {
    const result = await executeQuery<T[]>(
        `SELECT * FROM \`${table}\` WHERE ${TableIds[table]} = ?`, 
        [id]
    );

    return result[0];
}

export const create = async <T=any>(data: Record<string, any>, table: Tables): Promise<T> => {
    const fields = Object.keys(data);
    const values = Object.values(data);

    const fieldNames = fields.map(field => `\`${field}\``).join(", ");
    const placeholders = fields.map(() => '?').join(", ");

    const result = await executeQuery(
        `INSERT INTO \`${table}\` (${fieldNames}) VALUES (${placeholders})`,
        values
    );

    return getById(result.insertId, table);
}

export const update = async <T=any>(id: number, data: Record<string, any>, table: Tables, ): Promise<T> => {
    const fields = Object.keys(data);
    const values = Object.values(data);

    if (fields.length === 0) {
        throw new Error('No fields to insert');
    }

    const setClause = fields.map(field => `\`${field}\` = ?`).join(", ");
    
    await executeQuery(
        `UPDATE \`${table}\`
        SET ${setClause}
        WHERE ${TableIds[table]} = ?`,
        [...values, id]
    );

    return getById(id, table);
}

export const remove = async <T=any>(id: number, table: Tables): Promise<T> => {
    const deletedItem = await getById(id, table);

    if (!deletedItem) {
        throw new Error("Item not found.");
    }

    await executeQuery(
        `DELETE FROM \`${table}\` WHERE ${TableIds[table]} = ?`,
        [id]
    );

    return deletedItem;
}