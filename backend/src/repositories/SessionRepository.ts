import { IRepository } from "./IRepository";
import { Tables } from "@app/interfaces/tables";
import * as db from "@app/config/db"
import { ShoppingSession, ModifySessionDTO } from "@app/interfaces/Repository";

export class SessionRepository implements IRepository<ShoppingSession, ModifySessionDTO> {
    private readonly tableName = Tables.SESSION;

    async getAll(): Promise<ShoppingSession[]> {
        return db.getAll(this.tableName);
    }

    async getById(sessionId: number): Promise<ShoppingSession> {
        return db.getById(sessionId, this.tableName);
    }

    async create(sessionData: ModifySessionDTO): Promise<ShoppingSession> {
        return db.create(sessionData, this.tableName);
    }

    async update(sessionId: number, updatedData: Partial<ModifySessionDTO>): Promise<ShoppingSession> {
        return db.update(sessionId, updatedData, this.tableName);
    }

    async delete(sessionId: number): Promise<ShoppingSession> {        
        return db.remove(sessionId, this.tableName);
    }
}