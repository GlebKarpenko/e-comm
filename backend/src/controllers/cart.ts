import * as cartService from "@app/services/SessionService";
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
        const updatedCartItem = await cartService.addProductToCart(sessionId, productId, quantity);
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

export const removeFromCart = async (req: Request, res: Response): Promise<void> => {
    const { sessionId, productId, quantity = 1 } = req.body;

    if (!sessionId || !productId) {
        res.status(400).json({ message: "sessionId and productId are required" });
        return;
    }

    try {
        const result = await cartService.removeProductFromCart(sessionId, productId, quantity);
        if (!result) {
            res.status(404).json({ message: "Cart item not found" })
            return;
        }

        res.status(200).json(result);
    } catch (error) {
        Logger.error(
            `Could not remove product with id: ${productId} from session with id: ${sessionId}`,
            NAMESPACE,
            error
        )
        res.status(500).json({ message: "Error while removing product from cart" });
    }
}