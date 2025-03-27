import { RepositoryController } from "@app/controllers/RepositoryController";
import { OrderRepository } from "@app/repositories/OrderRepository";
import { Router } from "express";

const orderRepository = new OrderRepository();
const orderController = new RepositoryController(orderRepository, "ORDER_REQUEST");

export default (router: Router): void => {
    router.get("/orders", orderController.getAll);
    router.get("/orders/:id", orderController.getById);
    router.post("/orders", orderController.create);
    router.put("/orders/:id", orderController.update);
    router.delete("/orders/:id", orderController.delete);
}