import { useSessionStore } from "@/store/sessionStore";
import { CartItemDTO, SessionCart, CartItem } from "../types/cart.types";
import serverInstance from "@/config/api/serverInstance";

const mapCartDTO = (data: CartItemDTO): CartItem => {
    return {
        id: data.id_cart_item,
        sessionId: data.session_id,
        productId: data.product_id,
        quantity: data.quantity,
        productName: data.productName,
        productPrice: data.productPrice,
        productImage: data.productImage,
        itemTotal: data.itemTotal,
    }
}

export const fetchCart = async (): Promise<SessionCart | null> => {
    const sessionStore = useSessionStore();
    const sessionId = sessionStore.sessionId;

    try {
        const response = await serverInstance.get(
            `/sessions/cart/${sessionId}`
        );

        return {
            total: response.data.total,
            items: response.data.items.map((item: CartItemDTO) => mapCartDTO(item))
        }
    } catch (error) {
        return null;
    }
}

export const addToCart = async (productId: number): Promise<number> => {
    const sessionStore = useSessionStore();
    const sessionId = sessionStore.sessionId;

    try {
        const response = await serverInstance.post(
            `/cart-items/add`,
            { productId: productId, sessionId: sessionId }
        );

        return response.data.id_cart_item;
    } catch (error: any) {
        console.error(`Could not add item with id: ${productId} to cart`);
        console.error(error.message);
        return -1;
    }
}

export const removeFromCart = async (productId: number): Promise<number> => {
    const sessionStore = useSessionStore();
    const sessionId = sessionStore.sessionId;

    try {
        const response = await serverInstance.post(
            `/cart-items/remove`,
            { sessionId: sessionId, productId: productId }
        );

        return response.data.id_cart_item;
    } catch (error: any) {
        console.error(`Could not remove item with id: ${productId} from cart`);
        console.error(error.message);
        return -1;
    }
}