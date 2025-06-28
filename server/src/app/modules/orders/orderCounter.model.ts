import { Schema, model } from "mongoose";

const orderCounterSchema = new Schema({
  id: {
    type: String,
    required: true,
    default: "orderId",
  },
  seq: {
    type: Number,
    default: 1000, 
  },
});

export const OrderCounter = model("OrderCounter", orderCounterSchema);
