import { Stripe, StripeCardElement, StripeElements } from "@stripe/stripe-js"

export interface StripePayment {
    stripe: Stripe
    elements: StripeElements,
    card: StripeCardElement
}

export interface PaymentResponse {
    message: string,
    success: boolean
}