import { RepositoryController } from "@app/controllers/RepositoryController";
import { ShipmentRepository } from "@app/repositories/ShipmentRepository";
import { Router } from "express";

const shipmentRepository = new ShipmentRepository();
const shipmentController = new RepositoryController(shipmentRepository, "SHIPMENT_REQUEST");

export default (router: Router): void => {
    router.get("/shipments", shipmentController.getAll);
    router.get("/shipments/:id", shipmentController.getById);
    router.post("/shipments", shipmentController.create);
    router.put("/shipments/:id", shipmentController.update);
    router.delete("/shipments/:id", shipmentController.delete);
}