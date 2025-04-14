import { addToCart, removeFromCart } from "@app/controllers/cart";
import { RepositoryController } from "@app/controllers/RepositoryController";
import { CartItemRepository } from "@app/repositories/CartItemRepository";
import { Router } from "express";

const cartItemRepository = new CartItemRepository();
const cartItemController = new RepositoryController(cartItemRepository, "CART_ITEM_REQUEST");

export default (router: Router): void => {
    router.get("/cart-items", cartItemController.getAll);
    router.get("/cart-items/:id", cartItemController.getById);
    router.post("/cart-items", cartItemController.create);
    router.put("/cart-items/:id", cartItemController.update);
    router.delete("/cart-items/:id", cartItemController.delete);
    router.post("/cart-items/add", addToCart);
    router.post("/cart-items/remove", removeFromCart);
}