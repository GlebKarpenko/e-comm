export interface CartItem {
    id: number,
    sessionId: number,
    productId: number,
    quantity: number
    productName: string,
    productPrice: string,
    productImage: string
    itemTotal: number
}

export interface SessionCart {
    total: number,
    items: CartItem[]
}

export interface CartItemDTO {
    id_cart_item: number,
    session_id: number,
    product_id: number,
    quantity: number
    productName: string,
    productPrice: string,
    productImage: string
    itemTotal: number
}