import { IRepository } from "./IRepository";
import { Tables } from "@app/interfaces/tables";
import * as db from "@app/config/db"
import { Payment, ModifyPaymentDTO } from "@app/interfaces/Repository";

export class PaymentRepository implements IRepository<Payment, ModifyPaymentDTO> {
    private readonly tableName = Tables.PAYMENT;

    async getAll(): Promise<Payment[]> {
        return db.getAll(this.tableName);
    }

    async getById(paymentId: number): Promise<Payment> {
        return db.getById(paymentId, this.tableName);
    }

    async create(paymentData: ModifyPaymentDTO): Promise<Payment> {
        return db.create(paymentData, this.tableName);
    }

    async update(paymentId: number, updatedData: Partial<ModifyPaymentDTO>): Promise<Payment> {
        return db.update(paymentId, updatedData, this.tableName);
    }

    async delete(paymentId: number): Promise<Payment> {        
        return db.remove(paymentId, this.tableName);
    }
}