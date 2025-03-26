import * as db from "@app/config/db";
import { IRepository } from "./IRepository";
import { Discount, ModifyDiscountDTO } from "@app/interfaces/Repository";
import { Tables } from "@app/interfaces/tables";

export class DiscountRepository implements IRepository<Discount, ModifyDiscountDTO> {
    private readonly tableName = Tables.DISCOUNT;

    async getAll(): Promise<Discount[]> {
        return db.getAll(this.tableName);
    }

    async getById(discountId: number): Promise<Discount> {
        return db.getById(discountId, this.tableName);
    }

    async create(discountData: Partial<ModifyDiscountDTO>): Promise<any> {
        return db.create(discountData, this.tableName);
    }

    async update(discountId: number, updatedData: Partial<ModifyDiscountDTO>): Promise<Discount> {
        return db.update(discountId, updatedData, this.tableName);
    }

    async delete(discountId: number): Promise<any> {
        return db.remove(discountId, this.tableName);
    }
}