// src/modules/order/order.interface.ts
import { Types } from "mongoose";

export interface IOrderBook {
  bookId: Types.ObjectId;
  quantity: number;
}

export interface IOrder {
  user: Types.ObjectId;
  books: IOrderBook[];
  address: string;
  paymentMethod: "sslcommerz" | "cash-on-delivery";
  isPaid?: boolean;
  transactionId?: string;
  status?: "pending" | "processing" | "completed" | "cancelled";
  createdAt?: Date;
  updatedAt?: Date;
}
