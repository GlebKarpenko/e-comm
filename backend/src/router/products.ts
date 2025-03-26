import { RepositoryController } from "@app/controllers/RepositoryController";
import { ProductRepository } from "@app/repositories/ProductRepository";
import { Router } from "express";

const productRepository = new ProductRepository();
const productController = new RepositoryController(productRepository, "PRODUCT_REQUEST");

export default (router: Router): void => {
    router.get("/products", productController.getAll);
    router.get("/products/:id", productController.getById);
    router.post("/products", productController.create);
    router.put("/products/:id", productController.update);
    router.delete("/products/:id", productController.delete);
};