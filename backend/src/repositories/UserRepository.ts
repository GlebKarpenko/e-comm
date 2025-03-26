import * as db from '@app/config/db'
import { IRepository } from './IRepository';
import { User, ModifyUserDTO } from '@app/interfaces/Repository';
import { Tables } from '@app/interfaces/tables';

export class UserRepository implements IRepository<User, ModifyUserDTO> {
    private readonly tableName = Tables.USER;

    async getAll(): Promise<User[]> {
        return db.getAll(this.tableName);
    }

    async getById(userId: number): Promise<User> {
        return db.getById(userId, this.tableName);
    }

    async create(userData: ModifyUserDTO): Promise<User> {
        return db.create(userData, this.tableName);
    }

    async update(userId: number, updatedData: Partial<ModifyUserDTO>): Promise<User> {
        return db.update(userId, updatedData, this.tableName);
    }

    async delete(userId: number): Promise<User> {        
        return db.remove(userId, this.tableName);
    }
}