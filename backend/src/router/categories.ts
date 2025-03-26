import { RepositoryController } from "@app/controllers/RepositoryController";
import { CategoryRepository } from "@app/repositories/CategoryRepository";
import { Router } from "express";

const categoryRepository = new CategoryRepository();
const categoryController = new RepositoryController(categoryRepository, "CATEGORY_REQUEST");

export default (router: Router): void => {
    router.get("/categories", categoryController.getAll);
    router.get("/categories/:id", categoryController.getById);
    router.post("/categories", categoryController.create);
    router.put("/categories/:id", categoryController.update);
    router.delete("/categories/:id", categoryController.delete);
};