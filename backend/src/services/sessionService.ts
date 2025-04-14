import { CartItemRepository } from "@app/repositories/CartItemRepository"
import { CartItem } from "@app/interfaces/Repository";

const cartRepository = new CartItemRepository();

const getExistingCartItem = async (
    productId: number, 
    sessionId: number
): Promise<CartItem> => {
    const existingItems = await cartRepository.getAll();
    const existingItem = existingItems.find(item =>
        item.session_id === sessionId && item.product_id === productId
    );

    return existingItem;
}

export const addProductToCart = async (
    sessionId: number, 
    productId: number,
    quantity: number
): Promise<CartItem> => {
    const existingItem = await getExistingCartItem(productId, sessionId);

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

export const removeProductFromCart = async (
    sessionId: number, 
    productId: number,
    quantity: number
): Promise<CartItem | null> => {
    const existingItem = await getExistingCartItem(productId, sessionId);

    if (!existingItem) {
        return null;
    }

    if (!quantity || existingItem.quantity <= quantity) {
        return cartRepository.delete(existingItem.product_id);
    } else {
        const newQuantity = existingItem.quantity - quantity;
        return cartRepository.update(existingItem.id_cart_item, { quantity: newQuantity });
    }
}