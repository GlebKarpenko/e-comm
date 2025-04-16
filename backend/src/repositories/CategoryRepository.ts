import * as db from '@app/config/db'
import { IRepository } from "./IRepository";
import { ModifyCategoryDTO, ProductCategory } from "@app/interfaces/Repository";
import { Tables } from "@app/interfaces/tables";

interface CategoryProduct { 
    category_id: number,
    category_name: string,
    category_desc: string,
    product_id: number,
    product_name: string,
    product_slug: string,
    product_desc: string,
    product_SKU: string,
    product_image: string,
    product_image_mime: string,
    product_image_size: string,
    product_status: string,
    product_price: number,
    product_discount_id: number
}

export class CategoryRepository implements IRepository<ProductCategory, ModifyCategoryDTO> {
    private readonly tableName = Tables.CATEGORY;

    async getAll(): Promise<ProductCategory[]> {
        return db.getAll(this.tableName);
    }

    async getCategoriesProducts(): Promise<any[]> {
        const query = `
            SELECT
                c.id_product_category AS category_id,
                c.name AS category_name,
                c.desc AS category_desc,
                p.id_product AS product_id,
                p.name AS product_name,
                p.slug as product_slug,
                p.desc as product_desc,
                p.SKU as product_SKU,
                p.image as product_image,
                p.image_mime as product_image_mime,
                p.image_size as product_image_size,
                p.status as product_status,
                p.price AS product_price,
                p.id_discount AS product_discount_id
            FROM product_category c
            LEFT JOIN product p ON c.id_product_category = p.id_category
            ORDER BY c.id_product_category, p.id_product;
        `;

        const rows = await db.executeQuery<CategoryProduct[]>(query);
        const categoriesMap: Record<number, any> = {};

        rows.forEach((row: CategoryProduct) => {
            if (!categoriesMap[row.category_id]) {
                categoriesMap[row.category_id] = {
                    category_name: row.category_name,
                    category_des: row.category_desc,
                    products: []
                };
            }

            if (row.product_id) {
                categoriesMap[row.category_id].products.push({
                    id_product: row.product_id,
                    product_name: row.product_name,
                    product_slug: row.product_slug,
                    product_desc: row.product_desc,
                    product_SKU: row.product_SKU,
                    product_image: row.product_image,
                    product_image_mime: row.product_image_mime,
                    product_image_size: row.product_image_size,
                    product_status: row.product_status,
                    product_price: row.product_price,
                    product_discount_id: row.product_discount_id
                });
            }
        });

        return Object.values(categoriesMap);
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