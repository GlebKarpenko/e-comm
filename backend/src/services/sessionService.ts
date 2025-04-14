import { CartItemRepository } from "@app/repositories/CartItemRepository"
import { CartItem } from "@app/interfaces/Repository";
import { SessionRepository } from "@app/repositories/SessionRepository";
import { ProductRepository } from "@app/repositories/ProductRepository";
import { SessionCart } from "./sessionService.types";
import { Logger } from "@app/utils/Logger";

const cartRepository = new CartItemRepository();
const sessionRepository = new SessionRepository();
const productRepository = new ProductRepository();

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
        return cartRepository.delete(existingItem.id_cart_item);
    } else {
        const newQuantity = existingItem.quantity - quantity;
        return cartRepository.update(existingItem.id_cart_item, { quantity: newQuantity });
    }
}

const enrichItems = async (cartItems: CartItem[]): Promise<SessionCart> => {
    let total = 0;
    const enrichedItems = [];

    for (const item of cartItems) {
        const product = await productRepository.getById(item.product_id);
        const itemTotal = item.quantity * product.price;
        total += itemTotal;

        enrichedItems.push({
            ...item,
            productName: product.name,
            productPrice: product.price,
            productImage: product.image,
            itemTotal
        })
    }

    return {
        total: total,
        items: enrichedItems
    }
}

export const getCartBySessionId = async (sessionId: number): Promise<SessionCart> => {
    const cartItems = await cartRepository.getBySessionId(sessionId);

    Logger.debug("sessionId", "sessionService", sessionId);

    if (!cartItems.length) {
        return { total: 0, items: null };
    }

    const enrichedCart = await enrichItems(cartItems);
    const total = enrichedCart.total;

    // Need to update total on each get or post to sync with client
    await sessionRepository.update(sessionId, { total });

    return enrichedCart;
}