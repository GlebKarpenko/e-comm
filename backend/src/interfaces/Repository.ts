export interface User {
    id_user: number,
    username: string,
    email: string,
    provider: string,
    provider_id: string,
    role: 'customer' | 'admin',
    created_at: string,
    modified_at: string,
}

export interface ModifyUserDTO {
    username: string,
    email: string,
    provider: string,
    provider_id: string,
    role: 'customer' | 'admin',
}

export interface ProductCategory {
    id_product_category: number,
    name: string,
    desc: string,
    created_at: string,
    modified_at: string,
    deleted_at: string,
}

export interface ModifyCategoryDTO {
    name: string,
    desc: string,
}

export interface Discount {
    id_discount: number,
    name: string,
    desc: string,
    percentage: number,
    is_active: boolean,
    created_at: string,
    modified_at: string,
    deleted_at: string,
}

export interface ModifyDiscountDTO {
    name: string,
    desc: string,
    percentage: number,
    is_active: boolean,
}

export interface Product {
    id_product: number,
    name: string,
    slug: string,
    desc: string,
    SKU: string,
    image: string,
    image_mime: string,
    image_size: number,
    status: string,
    price: number,
    category: ProductCategory,
    inventory_quantity: number,
    discount: Discount,
    created_at: string,
    modified_at: string,
    deleted_at: string,
}

export interface ModifyProductDTO {
    name: string,
    slug: string,
    desc: string,
    SKU: string,
    image: string,
    image_mime: string,
    image_size: string,
    status: string,
    price: number,
    id_category: number,
    inventory_quantity: number,
    id_discount: number,
}

export interface ShoppingSession {
    id_shopping_session: number,
    user_id: number,
    total: number,
    created_at: string,
    modified_at: string,
    deleted_at: string,
}

export interface ModifySessionDTO {
    user_id: number,
    total: number,
}

export interface Shipment {
    id_user_address: number,
    id_user: number,
    first_name: string,
    last_name: string,
    address_line: string,
    city: string,
    postal_code: string,
    phone: string
}

export interface ModifyShipmentDTO {
    id_user: number,
    first_name: string,
    last_name: string,
    address_line: string,
    city: string,
    postal_code: string,
    phone: string
}

export interface CartItem {
    id_cart_item: number,
    session_id: number,
    product_id: number,
    quantity: number,
    created_at: string,
    deleted_at: string
}

export interface ModifyCartItemDTO {
    session_id: number,
    product_id: number,
    quantity: number,
}