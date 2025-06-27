import { Book } from "../books/book.model";

import { Types } from "mongoose";
import { Cart } from "./cart.model";

export const CartService = {
  async addToCart(userId: string, bookId: string, quantity: number) {
    const book = await Book.findById(bookId);
    if (!book) throw new Error("Book not found");
    if (!book.available || book.stock < quantity) {
      throw new Error("এই পরিমাণ বই স্টকে নেই।");
    }

    const existing = await Cart.findOne({ user: userId, book: bookId });

    if (existing) {
      const newQuantity = existing.quantity + quantity;
      if (newQuantity > book.stock) {
        throw new Error("Stock limit exceeded");
      }
      existing.quantity = newQuantity;
      return await existing.save();
    }

    const cartItem = await Cart.create({
      user: userId,
      book: bookId,
      quantity,
    });

    return cartItem;
  },

  async getMyCart(userId: string) {
    return await Cart.find({ user: userId }).populate("book");
  },

  async removeFromCart(userId: string, cartItemId: string) {
    return await Cart.findOneAndDelete({
      _id: cartItemId,
      user: userId,
    });
  },

  async updateCartQuantity(
    userId: string,
    cartItemId: string,
    quantity: number
  ) {
    const cartItem = await Cart.findOne({
      _id: cartItemId,
      user: userId,
    });
    if (!cartItem) throw new Error("Cart item not found");

    const book = await Book.findById(cartItem.book);
    if (!book) throw new Error("Book not found");

    if (quantity > book.stock) {
      throw new Error("Stock limit exceeded");
    }

    cartItem.quantity = quantity;
    return await cartItem.save();
  },

  async clearCart(userId: string) {
    return await Cart.deleteMany({ user: userId });
  },

  async mergeCart(userId: string, items: { book: string; quantity: number }[]) {
    for (const item of items) {
      await CartService.addToCart(userId, item.book, item.quantity);
    }
    return await CartService.getMyCart(userId);
  },
};
