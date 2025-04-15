import { loadStripe, Stripe, StripeElements, StripeCardElement } from "@stripe/stripe-js";
import { fetchStripeSecret } from "../api"
import { PaymentResponse, StripePayment } from "./payment.types";
import config from "@/config";

let stripe: Stripe | null = null;
let elements: StripeElements | null = null;
let card: StripeCardElement | null = null;

export async function initializePayment(): Promise<PaymentResponse>{
    if (!config.stripe.publishableKey) {
        return { message: "No Stripe publishable key provided.", success: false };
    }

    stripe = await loadStripe(config.stripe.publishableKey);

    if (stripe) {
        elements = stripe.elements();
        card = elements.create('card');
        
        if (card) {
            const mountResponse = mountCard(card);
            if (!mountResponse.success) {
                return { message: mountResponse.message, success: false };
            }
        }

        return { message: '', success: true };
    } else {
        return { message: 'Could not connect to Stripe', success: false };
    }
}

function mountCard(card: StripeCardElement): PaymentResponse {
    // Guard against DOM not existing when mounting card
    const mountPoint = document.getElementById('card-element');
    if (!mountPoint) {
        return { 
            message: "Mount point for card element not found", 
            success: false 
        };
    }
    card.mount(mountPoint);

    return { 
        message: "Mounted card element to mountPoint", 
        success: true 
    };
}

export function getPayment(): StripePayment | null {
    if (stripe && elements && card) {
        return {
            stripe,
            elements,
            card
        }
    } else {
        return null;
    }
}

export async function createPayment (
    amount: number, 
    currency: string
): Promise<PaymentResponse> {
    const clientSecret = await fetchStripeSecret(amount, currency);

    console.log(clientSecret);

    if (clientSecret.success && stripe && elements && card) {
        const result = await stripe.confirmCardPayment(clientSecret.value, {
            payment_method: {
                card: card,
            },
        });

        if (result.error) {
            console.log(result.error);

            return {
                message: result.error.message || "Could not confirm card payment",
                success: false
            }
        }

        return {
            message: "Successfully made payment",
            success: true
        }
    }
    return {
        message: "Could not connect to Stripe",
        success: false
    }
}