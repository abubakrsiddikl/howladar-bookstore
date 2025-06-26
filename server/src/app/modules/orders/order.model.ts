import { Schema, model } from "mongoose";
import { IOrder } from "./order.interface";

const orderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    shippingInfo: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      address: { type: String, required: true },
      phone: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "SSLCommerz"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Paid", "Pending"],
      default: "Pending",
    },
    totalAmount: { type: Number, required: true },
    orderStatus: {
      type: String,
      enum: ["Processing", "Delivered", "Cancelled"],
      default: "Processing",
    },
  },
  { versionKey: false, timestamps: true }
);

export const Order = model<IOrder>("Order", orderSchema);
