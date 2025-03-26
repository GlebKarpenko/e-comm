import { RepositoryController } from "@app/controllers/RepositoryController";
import { DiscountRepository } from "@app/repositories/DiscountRepository";
import { Router } from "express";

const discountRepository = new DiscountRepository();
const discountController = new RepositoryController(discountRepository, "DISCOUNT_REQUEST");

export default (router: Router): void => {
    router.get("/discounts", discountController.getAll);
    router.get("/discounts/:id", discountController.getById);
    router.post("/discounts", discountController.create);
    router.put("/discounts/:id", discountController.update);
    router.delete("/discounts/:id", discountController.delete);
};