import * as db from '@app/config/db'
import { IRepository } from './IRepository';
import { Tables } from '@app/interfaces/tables';
import { ModifyProductDTO, Product } from '@app/interfaces/Repository';

export class ProductRepository implements IRepository<Product, ModifyProductDTO> {
    private readonly tableName = Tables.PRODUCT;
    
    async getAll(): Promise<Product[]> {
        const query = `
            SELECT p.*,
                c.id_product_category AS "product_category",
                c.name AS "product_category.name",
                d.id_discount AS "discount.id_discount",
                d.percentage AS "discount.percentage"
            FROM ${Tables.PRODUCT} p
            JOIN ${Tables.CATEGORY} c ON p.id_category = c.id_product_category
            LEFT JOIN ${Tables.DISCOUNT} d ON p.id_discount = d.id_discount
        `;

        return db.executeQuery<Product[]>(query);
    }

    async getById(productId: number): Promise<Product> {
        const query = `
            SELECT p.*,
                c.id_product_category AS "product_category",
                c.name AS "product_category.name",
                d.id_discount AS "discount.id_discount",
                d.percentage AS "discount.percentage"
            FROM ${Tables.PRODUCT} p
            JOIN ${Tables.CATEGORY} c ON p.id_category = c.id_product_category
            LEFT JOIN ${Tables.DISCOUNT} d ON p.id_discount = d.id_discount
            WHERE p.id_product = ?
        `;

        const result = await db.executeQuery<Product[]>(query, [productId]);
        return result[0];
    }

    async create(productData: Partial<ModifyProductDTO>): Promise<any> {
        return db.create(productData, this.tableName);
    }

    async update(productId: number, productData: Partial<ModifyProductDTO>): Promise<any> {
        return db.update(productId, productData, this.tableName);
    }

    async delete(productId: number): Promise<any> {
        return db.remove(productId, this.tableName);
    }
}