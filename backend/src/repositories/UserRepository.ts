import * as db from '@app/config/db'
import { QueryResult } from 'mysql2';
import { Repository } from './IRepository';
import { CreateUserDTO, UpdateUserDTO, User } from '@app/interfaces/User';
import { Tables } from '@app/interfaces/tables';
import { Logger } from '@app/config/Logger';

export class UserRepository implements Repository<User> {
    async getAll(): Promise<User[]> {
        return db.executeQuery<User[]>(
            `SELECT * FROM ${Tables.USER}`
        );
    }

    async getById(id: number): Promise<User> {
        const result = await db.executeQuery<User[]>(
            `SELECT * FROM ${Tables.USER} WHERE id_user = ?`, 
            [id]
        );
    
        return result[0];
    }

    async create(userData: CreateUserDTO): Promise<User> {
        const { username, email, provider, provider_id, role } = userData;

        const result = await db.executeQuery(
            `INSERT INTO ${Tables.USER} (username, email, provider, provider_id, role)
            VALUES (?, ?, ?, ?, ?)`, 
            [username, email, provider, provider_id, role]
        );

        return this.getById(result.insertId);
    }

    async update(userId: number, updatedData: Partial<UpdateUserDTO>): Promise<User> {
        const fields = Object.keys(updatedData);
        if (fields.length === 0) {
            throw new Error('No fields to update');
        }

        const values = Object.values(updatedData);
        const setClause = fields.map(field => `${field} = ?`).join(", ");

        await db.executeQuery(
            `UPDATE ${Tables.USER} 
            SET ${setClause}
            WHERE id_user = ?`,
            [...values, userId]
        );

        return this.getById(userId);
    }

    async delete(userId: number): Promise<User> {
        Logger.debug("Deleting user with id: ", "REPOSITORY", userId);

        const deletedUser = await this.getById(userId);

        if (!deletedUser.id_user) {
            throw new Error('User not found. ');
        }
        
        await db.executeQuery(
            `DELETE FROM ${Tables.USER} WHERE id_user = ?`,
            [userId]
        );

        return deletedUser;
    }
}