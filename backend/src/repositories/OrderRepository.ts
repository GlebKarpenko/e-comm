import { IRepository } from "./IRepository";
import { Tables } from "@app/interfaces/tables";
import * as db from "@app/config/db"
import { Order, ModifyOrderDTO } from "@app/interfaces/Repository";

export class OrderRepository implements IRepository<Order, ModifyOrderDTO> {
    private readonly tableName = Tables.ORDER;

    async getAll(): Promise<Order[]> {
        return db.getAll(this.tableName);
    }

    async getById(orderId: number): Promise<Order> {
        return db.getById(orderId, this.tableName);
    }

    async create(orderData: ModifyOrderDTO): Promise<Order> {
        return db.create(orderData, this.tableName);
    }

    async update(orderId: number, updatedData: Partial<ModifyOrderDTO>): Promise<Order> {
        return db.update(orderId, updatedData, this.tableName);
    }

    async delete(orderId: number): Promise<Order> {        
        return db.remove(orderId, this.tableName);
    }
}