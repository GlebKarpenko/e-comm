import serverInstance from "@/config/api/serverInstance"

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