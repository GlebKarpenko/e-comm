import * as db from '@app/config/db'
import { IRepository } from "./IRepository";
import { ModifyCategoryDTO, ProductCategory } from "@app/interfaces/Repository";
import { Tables } from "@app/interfaces/tables";

export class CategoryRepository implements IRepository<ProductCategory, ModifyCategoryDTO> {
    private readonly tableName = Tables.CATEGORY;

    async getAll(): Promise<ProductCategory[]> {
        return db.getAll(this.tableName);
    }

    async getById(categoryId: number): Promise<ProductCategory> {
        return db.getById(categoryId, this.tableName);
    }

    async create(categoryData: ModifyCategoryDTO): Promise<ProductCategory> {
        return db.create(categoryData, this.tableName);
    }

    async update(categoryId: number, updatedData: Partial<ModifyCategoryDTO>): Promise<ProductCategory> {
        return db.update(categoryId, updatedData, this.tableName);
    }

    async delete(categoryId: number): Promise<ProductCategory> {
        return db.remove(categoryId, this.tableName);
    }
}