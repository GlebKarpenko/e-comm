import { BillingInfo } from "@app/controllers/payment";
import { ModifyShipmentDTO } from "@app/interfaces/Repository";
import { ShipmentRepository } from "@app/repositories/ShipmentRepository";

/**
 * Save billing information with validation and response messaging
 * @param billingInfo The billing info to save
 * @returns Object with success flag and message
 */
export async function saveBillingInfo(billingInfo: BillingInfo): Promise<{ success: boolean; message: string; errors?: string[] }> {
    try {
        // First verify the billing info
        const validation = verifyBillingInfo(billingInfo);
      
        if (!validation.isValid) {
            return {
            success: false,
            message: 'Billing information validation failed',
            errors: validation.errors
            };
        }
      
        // Prepare data for database
        const shipmentRepo = new ShipmentRepository();
        const shipmentData: ModifyShipmentDTO = {
            first_name: billingInfo.firstName,
            last_name: billingInfo.lastName,
            email: billingInfo.email,
            phone: billingInfo.phone,
            address_line: billingInfo.address,
            city: billingInfo.city,
            postal_code: billingInfo.zip,
            country: billingInfo.country
        };
        await shipmentRepo.create(shipmentData);
        return {
            success: true,
            message: 'Billing information saved successfully'
        };
    } catch (error) {
        console.error('Error saving billing information:', error);
        return {
            success: false,
            message: 'An error occurred while saving billing information',
            errors: [(error as Error).message]
        };
    }
}

/**
 * Verify billing info fields and return validation result
 * @param billingInfo The billing information to validate
 * @returns Object with isValid flag and error messages
 */
function verifyBillingInfo(billingInfo: BillingInfo): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    // Check required fields
    if (!billingInfo.firstName?.trim()) errors.push('First name is required');
    if (!billingInfo.lastName?.trim()) errors.push('Last name is required');
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!billingInfo.email?.trim()) {
        errors.push('Email is required');
    } else if (!emailRegex.test(billingInfo.email)) {
        errors.push('Please provide a valid email address');
    }
    
    // Validate phone number (simple check for now)
    if (!billingInfo.phone?.trim()) {
        errors.push('Phone number is required');
    } else if (!/^[+]?[\d\s()-]{8,20}$/.test(billingInfo.phone)) {
        errors.push('Please provide a valid phone number');
    }
    
    // Validate address fields
    if (!billingInfo.address?.trim()) errors.push('Address is required');
    if (!billingInfo.city?.trim()) errors.push('City is required');
    if (!billingInfo.zip?.trim()) errors.push('ZIP/Postal code is required');
    if (!billingInfo.country?.trim()) errors.push('Country is required');
    
    return { 
        isValid: errors.length === 0,
        errors 
    };
}