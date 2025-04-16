export interface Shipment {
    id_user_address: number,
    first_name: string,
    last_name: string,
    address_line: string,
    city: string,
    postal_code: string,
    phone: string,
    country: string,
    email: string
}

export interface Discount {
    id_discount: number,
    name: string,
    description: string,
    percent: number,
    active: boolean,
    created_at: string,
    modified_at: string,
    deleted_at: string | null
}

export interface ProductCategory {
    id_category: number,
    name: string,
    description: string,
    created_at: string,
    modified_at: string,
    deleted_at: string | null
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

export interface CategoryWithProducts {
    category_name: string,
    category_des: string,
    products: {
        product_name: string,
        product_slug: string,
        product_desc: string,
        product_SKU: string,
        product_image: string,
        product_image_mime: string,
        product_image_size: string,
        product_status: string,
        product_price: string,
        product_discount_id: number
    }[]
}