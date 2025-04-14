interface SessionItem {
    id_cart_item: number,
    product_id: number,
    session_id: number,
    quantity: number,
    productName: string,
    productImage: string,
    productPrice: number,
    itemTotal: number
}

export interface SessionCart {
    total: number,
    items?: SessionItem[]
}