import { Request, Response } from "express"
import config from "@app/config/config";
import { Logger } from "@app/utils/Logger";
import { saveBillingInfo } from '@app/services/paymentService';

const NAMESPACE = "PAYMENT_CONTROLLER";

export interface BillingInfo {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    address: string,
    city: string,
    zip: string,
    country: string
}

export const createPaymentIntent = async (req: Request, res: Response): Promise<void> => {
    const { amount, currency } = req.body;

    try {
        const paymentIntent = await config.stripe.paymentIntents.create({
            amount,
            currency
        });

        res.send({
            clientSecret: paymentIntent.client_secret
        });
    } catch (error) {
        Logger.error("Could not send payment intent", NAMESPACE, error);
        res.status(500).send({ error: error.message });
    }
}

export const handleBillingInfoSubmission = async (req: Request, res: Response) => {
    try {
        const billingInfo: BillingInfo = req.body;
        const result = await saveBillingInfo(billingInfo);
        
        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(400).json(result);
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
}