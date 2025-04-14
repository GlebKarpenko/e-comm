import { getCart } from "@app/controllers/cart";
import { RepositoryController } from "@app/controllers/RepositoryController";
import { SessionRepository } from "@app/repositories/SessionRepository";
import { Router } from "express";

const sessionRepository = new SessionRepository();
const sessionController = new RepositoryController(sessionRepository, "SESSION_REQUEST");

export default (router: Router): void => {
    router.get("/sessions", sessionController.getAll);
    router.get("/sessions/:id", sessionController.getById);
    router.get("/sessions/cart/:sessionId", getCart);
    router.post("/sessions", sessionController.create);
    router.put("/sessions/:id", sessionController.update);
    router.delete("/sessions/:id", sessionController.delete);
}