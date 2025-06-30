import { Order } from "./order.model";
import { IOrder } from "./order.interface";
import { ClientSession } from "mongoose";
export const OrderService = {
  // ! create a new order
  createOrder: async (orderData: IOrder, session?: ClientSession) => {
    const order = await Order.create([orderData], { session });
    return order[0];
  },
  // ! get all order and search order
  getAllOrders: async (search?: string, status?: string) => {
    let query: any = {};

    if (search) {
      const regex = new RegExp(search, "i");
      query = {
        $or: [
          { orderId: { $regex: regex } },
          { "shippingInfo.phone": { $regex: regex } },
          { "shippingInfo.address": { $regex: regex } },
        ],
      };
    }
    if (status) {
      query.orderStatus = status;
    }

    const orders = await Order.find(query)
      .populate("items.book")
      .populate("user")
      .sort({ createdAt: -1 });

    return orders;
  },

  // ! customer get her order
  getMyOrders: async (userId: string, search: string) => {
    const query: any = { user: userId };
    if (search) {
      query.$or = [
        { orderId: { $regex: search, $options: "i" } },
        { "shippingInfo.phone": { $regex: search, $options: "i" } },
        { "shippingInfo.address": { $regex: search, $options: "i" } },
      ];
    }
    const orders = await Order.find(query)
      .populate("items.book")
      .sort({ createdAt: -1 });
    return orders;
  },

  // ! get a single order
  getSingleOrder: async (orderId: string) => {
    const order = await Order.findOne({ _id: orderId }).populate("items.book");
    return order;
  },

  // ! update order status "Processing" or "Delivered" or "Cancelled"
  updateOrderStatus: async (orderId: string, status: string) => {
    const order = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus: status },
      { new: true }
    );
    return order;
  },
  // ! update payment status Paid or pending
  updatePaymentStatus: async (orderId: string) => {
    const order = await Order.findByIdAndUpdate(
      orderId,
      { paymentStatus: "Paid" },
      { new: true }
    );
    return order;
  },
};
