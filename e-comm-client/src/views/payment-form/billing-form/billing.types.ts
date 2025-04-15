export interface BillingInfo {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    zip: string;
    country: string;
}
  
export interface Country {
    code: string;
    name: string;
}
  
export interface FormErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    zip?: string;
    country?: string;
}