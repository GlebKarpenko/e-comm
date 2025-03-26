import { IRepository } from "@app/repositories/IRepository";
import { Logger } from "@app/utils/Logger";
import { Request, Response } from "express";

export class RepositoryController<T, DTO> {
    private repository: IRepository<T, DTO>;
    private namespace: string;

    constructor(repository: IRepository<T, DTO>, namespace: string) {
        this.repository = repository;
        this.namespace = namespace;
    }

    getAll = async (req: Request, res: Response): Promise<void> => {
        try {
            const items = await this.repository.getAll();
            res.status(200).json(items);
        } catch (error) {
            Logger.error("Could not get all items from repository. ", this.namespace, error);
            res.status(500).json({ message: error.message });
        }
    }

    getById = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;

            if (!id) {
                res.status(400).json({ message: "Missing id parameter "});
                return;
            }

            const item = await this.repository.getById(Number(id));
            res.status(200).json(item);
        } catch (error) {
            Logger.error("Could not get item from repository.", this.namespace, error);
            res.status(500).json({ message: error.message });
        }
    }

    create = async (req: Request, res: Response): Promise<void> => {
        try {
            const data = req.body as DTO;

            if (!data) {
                res.status(400).json({ message: "Missing data from request body." });
                return;
            }

            const result = await this.repository.create(data);
            res.status(201).json(result);
        } catch (error) {
            Logger.error("Could not create new item.", this.namespace, error);
        }
    }

    update = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const data = req.body as DTO;

            if (!id) {
                res.status(400).json({ message: "Missing id parameter" });
                return;
            }

            if (!data) {
                res.status(400).json({ message: "Missing request body" });
                return;
            }

            const result = await this.repository.update(Number(id), data);
            res.status(200).json(result);
        } catch (error) {
            Logger.error(`Could not update item.`, this.namespace, error);
            res.status(500).json({ message: error.message });
        }
    }

    delete = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;

            if (!id) {
                res.status(400).json({ message: "Missing id parameter" });
                return;
            }

            const result = await this.repository.delete(Number(id));
            res.status(200).json(result);
        } catch (error) {
            Logger.error(`Could not delete item.`, this.namespace, error);
            res.status(500).json({ message: error.message });
        }
    }
}