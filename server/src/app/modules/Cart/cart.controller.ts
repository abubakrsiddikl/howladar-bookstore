import { Request, Response } from "express";
import { CartService } from "./cart.service";

export const CartController = {
  async addToCart(req: Request, res: Response) {
    const userId = req.user?.userId;
    const { book, quantity } = req.body;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const result = await CartService.addToCart(userId, book, quantity);
    res.status(201).json({
      success: true,
      message: "Item added to cart",
      data: result,
    });
  },

  async getMyCart(req: Request, res: Response) {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const result = await CartService.getMyCart(userId);
    res.status(200).json({
      success: true,
      data: result,
    });
  },

  async removeFromCart(req: Request, res: Response) {
    const userId = req.user?.userId;
    const cartItemId = req.params.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    await CartService.removeFromCart(userId, cartItemId);
    res.status(200).json({
      success: true,
      message: "Item removed from cart",
    });
  },

  async updateCartQuantity(req: Request, res: Response) {
    const userId = req.user?.userId;
    const cartItemId = req.params.id;
    const { quantity } = req.body;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const result = await CartService.updateCartQuantity(
      userId,
      cartItemId,
      quantity
    );
    res.status(200).json({
      success: true,
      message: "Cart item updated",
      data: result,
    });
  },

  async clearCart(req: Request, res: Response) {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    await CartService.clearCart(userId);
    res.status(200).json({
      success: true,
      message: "Cart cleared",
    });
  },

  async mergeCart(req: Request, res: Response) {
    const userId = req.user?.userId;
    const { items } = req.body;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const result = await CartService.mergeCart(userId, items);
    res.status(200).json({
      success: true,
      message: "Cart merged successfully",
      data: result,
    });
  },
};
