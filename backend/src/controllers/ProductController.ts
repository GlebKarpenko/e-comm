import { Request, Response } from "express";
import { RepositoryController } from "./RepositoryController";
import { Logger } from "@app/utils/Logger";
import { IRepository } from "@app/repositories/IRepository";

export class ProductController<T, DTO> extends RepositoryController<T, DTO> {
    constructor(repository: IRepository<T, DTO>, namespace: string) {
        super(repository, namespace);
    }

    getCategoryItems = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;

            if (!id) {
                res.status(400).json({ message: "Missing category id parameter" });
                return;
            }

            const item = await this.repository.getCategoryItems(Number(id));
            res.status(200).json(item);
        } catch (error) {
            Logger.error("Could not get item by category from repository.", this.namespace, error);
            res.status(500).json({ message: error.message });
        }
    }
}