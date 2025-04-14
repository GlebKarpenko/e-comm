import { addProductToCart } from "@app/services/SessionService";
import { Logger } from "@app/utils/Logger";
import { Request, Response } from "express";

const NAMESPACE = "CART-CONTROLLER";

export const addToCart = async (req: Request, res: Response): Promise<void> => {
    const { sessionId, productId, quantity = 1 } = req.body;

    if (!sessionId || !productId) {
        res.status(400).json({ message: "sessionId and productId are required" });
        return;
    }
    
    try {
        const updatedCartItem = await addProductToCart(sessionId, productId, quantity);
        res.status(200).json(updatedCartItem);
    } catch (error) {
        Logger.error(
            `Could not add product with id: ${productId} to session with id: ${sessionId}`,
            NAMESPACE,
            error
        )
        res.status(500).json({ message: "Error while adding product to cart" });
    }
}