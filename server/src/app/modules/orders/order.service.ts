import { Order } from "./order.model";
import { IOrder } from "./order.interface";
export const OrderService = {
  // ! create a new order
  createOrder: async (orderData: IOrder) => {
    const order = await Order.create(orderData);
    return order;
  },

  // ! customer get her order
  getMyOrders: async (userId: string) => {
    const orders = await Order.find({ user: userId }).populate("items.book");
    return orders;
  },

  // ! get a single order
  getSingleOrder: async (orderId: string, userId: string) => {
    const order = await Order.findOne({ _id: orderId, user: userId }).populate(
      "items.book"
    );
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
