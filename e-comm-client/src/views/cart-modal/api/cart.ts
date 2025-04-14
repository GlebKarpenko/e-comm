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
    try {
        const sessionStore = useSessionStore();
        const sessionId = sessionStore.sessionId;

        const response = await serverInstance.get(
            `/sessions/cart/${sessionId}`
        );

        return {
            total: response.data.total,
            items: response.data.items.map((item: CartItemDTO) => mapCartDTO(item))
        }
    } catch (error) {
        console.error("Could not fetch cart by session id");
        return null;
    }
}