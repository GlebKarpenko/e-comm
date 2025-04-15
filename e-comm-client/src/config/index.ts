import { STRIPE_PUBLISHABLE } from '@/config/donotcommitmeplease';

const MAIN_API_BASE_URL = process.env.VITE_MAIN_API_BASE_URL || 'http://localhost:8081/';
const STRIPE_PUBLISHABLE_KEY = process.env.VITE_STRIPE_PUBLISHABLE_KEY || STRIPE_PUBLISHABLE;

const config = {
    mainApi: {
        baseUrl: MAIN_API_BASE_URL
    },
    stripe: {
        publishableKey: STRIPE_PUBLISHABLE_KEY
    }
}

export default config;