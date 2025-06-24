import { Schema, model } from "mongoose";
import { IOrder } from "./order.interface";

const OrderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    books: [
      {
        bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    address: {
      type: String,
      required: [true, "Delivery address is required"],
    },
    paymentMethod: {
      type: String,
      enum: ["sslcommerz", "cash-on-delivery"],
      required: true,
    },
    isPaid: { type: Boolean, default: false },
    transactionId: { type: String },
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Order = model<IOrder>("Order", OrderSchema);
