import serverInstance from "@/config/api/serverInstance"
import { BillingInfo } from "../billing-form/billing.types";

interface SecretResponse {
    value: string,
    error: string,
    success: boolean
}

export const fetchStripeSecret = async (
    amount: number, 
    currency: string
): Promise<SecretResponse> => {
    try {
        const response = await serverInstance.post<{ clientSecret: string }>
        (
            `payments/intent`,
            { amount, currency }
        );

        return {
            value: response.data.clientSecret,
            error: '',
            success: true 
        };
    } catch (error) {
        const errorMessage = "Could not recieve payment intent";
        console.error(errorMessage);
        return {
            value: '',
            error: errorMessage,
            success: false
        };
    }
}

export const submitBillingInfo = async (data: BillingInfo): Promise<string> => {
    try {
        const response = await serverInstance.post<{ clientSecret: string }>
        (
            `shipments/submit`,
            data
        );

        if (response.status === 201) {
            return "Sucessfully saved payment info";
        }
        return "Could not save payment info";
    } catch (err) {
        console.error(err);
        return "Could not save payment info";
    }
}