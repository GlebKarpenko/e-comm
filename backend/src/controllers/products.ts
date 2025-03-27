import { Request, Response } from "express";
import { ProductRepository } from "@app/repositories/ProductRepository";
import { Logger } from "@app/utils/Logger";
import { CategoryRepository } from "@app/repositories/CategoryRepository";

const NAMESPACE = "PRODUCTS_CATEGORIZED_REQUEST";

export const getCategoryItems = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({ message: "Missing category id parameter" });
            return;
        }

        const productRepository = new ProductRepository();
        const item = await productRepository.getCategoryItems(Number(id));

        res.status(200).json(item);
    } catch (error) {
        Logger.error("Could not get item by category from repository.", NAMESPACE, error);
        res.status(500).json({ message: error.message });
    }
}

export const getCategoriesWithProducts = async (req: Request, res: Response) => {
    try {
        const categoryRepository = new CategoryRepository();
        const items = await categoryRepository.getCategoriesProducts();

        res.status(200).json(items);
    } catch (error) {
        Logger.error("Could not get item list of all categories", NAMESPACE, error);
        res.status(500).json({ message: error.message });
    }
}