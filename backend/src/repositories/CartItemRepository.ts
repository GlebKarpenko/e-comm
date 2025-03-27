import { IRepository } from "./IRepository";
import { Tables } from "@app/interfaces/tables";
import * as db from "@app/config/db"
import { CartItem, ModifyCartItemDTO } from "@app/interfaces/Repository";

export class CartItemRepository implements IRepository<CartItem, ModifyCartItemDTO> {
    private readonly tableName = Tables.CART_ITEM;

    async getAll(): Promise<CartItem[]> {
        return db.getAll(this.tableName);
    }

    async getById(cartItemId: number): Promise<CartItem> {
        return db.getById(cartItemId, this.tableName);
    }

    async create(cartItemData: ModifyCartItemDTO): Promise<CartItem> {
        return db.create(cartItemData, this.tableName);
    }

    async update(cartItemId: number, updatedData: Partial<ModifyCartItemDTO>): Promise<CartItem> {
        return db.update(cartItemId, updatedData, this.tableName);
    }

    async delete(cartItemId: number): Promise<CartItem> {        
        return db.remove(cartItemId, this.tableName);
    }
}