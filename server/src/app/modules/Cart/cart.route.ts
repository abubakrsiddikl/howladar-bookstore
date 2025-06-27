import express from "express";
import { CartController } from "./cart.controller";
import { authenticate } from "../auth/auth.middleware";


const router = express.Router();

router.get("/my-cart", authenticate, CartController.getMyCart);
router.post("/add", authenticate, CartController.addToCart);
router.delete("/remove/:id", authenticate, CartController.removeFromCart);
router.patch("/update/:id", authenticate, CartController.updateCartQuantity);
router.delete("/clear", authenticate, CartController.clearCart);
router.post("/merge", authenticate, CartController.mergeCart);

export const CartRoutes = router;
