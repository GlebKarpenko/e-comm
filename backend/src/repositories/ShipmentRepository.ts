import { IRepository } from "./IRepository";
import { Tables } from "@app/interfaces/tables";
import * as db from "@app/config/db"
import { Shipment, ModifyShipmentDTO } from "@app/interfaces/Repository";

export class ShipmentRepository implements IRepository<Shipment, ModifyShipmentDTO> {
    private readonly tableName = Tables.SHIPMENT;

    async getAll(): Promise<Shipment[]> {
        return db.getAll(this.tableName);
    }

    async getById(shipmentId: number): Promise<Shipment> {
        return db.getById(shipmentId, this.tableName);
    }

    async create(shipmentData: ModifyShipmentDTO): Promise<Shipment> {
        return db.create(shipmentData, this.tableName);
    }

    async update(shipmentId: number, updatedData: Partial<ModifyShipmentDTO>): Promise<Shipment> {
        return db.update(shipmentId, updatedData, this.tableName);
    }

    async delete(shipmentId: number): Promise<Shipment> {        
        return db.remove(shipmentId, this.tableName);
    }
}