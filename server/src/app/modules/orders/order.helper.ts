import { OrderCounter } from "./orderCounter.model";

export const getNextOrderId = async (): Promise<string> => {
  const counter = await OrderCounter.findOneAndUpdate(
    { id: "orderId" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return `${counter.seq}`;
};
