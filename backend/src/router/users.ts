import { RepositoryController } from "@app/controllers/RepositoryController";
import { UserRepository } from "@app/repositories/UserRepository";
import { Router } from "express";

const userRepository = new UserRepository();
const userController = new RepositoryController(userRepository, "USER_REQUEST");

export default (router: Router): void => {
    router.get("/users", userController.getAll);
    router.get("/users/:id", userController.getById);
    router.post("/users", userController.create);
    router.put("/users/:id", userController.update);
    router.delete("/users/:id", userController.delete);
};