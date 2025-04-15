import { createPaymentIntent } from "@app/controllers/payment";
import { RepositoryController } from "@app/controllers/RepositoryController";
import { PaymentRepository } from "@app/repositories/PaymentRepository";
import { Router } from "express";

const paymentRepository = new PaymentRepository();
const paymentController = new RepositoryController(paymentRepository, "PAYMENT_REQUEST");

export default (router: Router): void => {
    router.get("/payments", paymentController.getAll);
    router.get("/payments/:id", paymentController.getById);
    router.post("/payments", paymentController.create);
    router.post("/payments/intent", createPaymentIntent);
    router.put("/payments/:id", paymentController.update);
    router.delete("/payments/:id", paymentController.delete);
}