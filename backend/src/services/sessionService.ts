import { CartItemRepository } from "@app/repositories/CartItemRepository"

export const addProductToCart = async (
    sessionId: number, 
    productId: number,
    quantity: number
) => {
    const cartRepository = new CartItemRepository();

    const existingItems = await cartRepository.getAll();
    const existingItem = existingItems.find(item =>
        item.session_id === sessionId && item.product_id === productId
    );

    if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        return cartRepository.update(existingItem.id_cart_item, { quantity: newQuantity });
    } else {
        return cartRepository.create({
            session_id: sessionId,
            product_id: productId,
            quantity: quantity
        });
    }
}