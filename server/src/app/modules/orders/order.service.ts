import { Book } from "../books/book.model";
import { IOrder } from "./order.interface";

import mongoose from "mongoose";
import { Order } from "./order.model";

export const OrderService = {
  createOrder: async (
    userId: string,
    payload: Omit<IOrder, "user" | "createdAt" | "updatedAt">
  ) => {
    // Validate stock availability
    for (const item of payload.books) {
      const book = await Book.findById(item.bookId);
      if (!book) throw new Error(`Book with ID ${item.bookId} not found`);
      if (book.stock < item.quantity)
        throw new Error(`Insufficient stock for ${book.title}`);
    }

    // Deduct stock
    for (const item of payload.books) {
      await Book.findByIdAndUpdate(item.bookId, {
        $inc: { stock: -item.quantity },
      });
    }
    let totalAmount = 0;
    for (const item of payload.books) {
      const book = await Book.findById(item.bookId);
      if (!book) throw new Error("Book not found");
      totalAmount += book.price * item.quantity;
    }

    // Create order
    const order = await Order.create({
      user: new mongoose.Types.ObjectId(userId),
      books: payload.books,
      totalAmount: totalAmount,
      paymentGateway: payload.paymentMethod,
      paymentStatus: "pending",
    });

    return order;
  },

  updatePaymentStatus: async (
    orderId: string,
    status: "completed" | "failed",
    transactionId?: string
  ) => {
    return Order.findByIdAndUpdate(
      orderId,
      { paymentStatus: status, transactionId },
      { new: true }
    );
  },

  getUserOrders: async (userId: string) => {
    return Order.find({ user: userId }).populate("books.bookId");
  },
};
