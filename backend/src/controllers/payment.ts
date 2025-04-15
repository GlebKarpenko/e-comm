import { Request, Response } from "express"
import config from "@app/config/config";
import { Logger } from "@app/utils/Logger";

const NAMESPACE = "PAYMENT_CONTROLLER";

export const createPaymentIntent = async (req: Request, res: Response): Promise<void> => {
    const { amount, currency } = req.body;

    try {
        console.log("SUKA")

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