import { Request, Response } from "express";
import { Types } from "mongoose";
import { OrderService } from "./order.service";
import { createOrderZodSchema } from "./order.validation";

export const OrderController = {
  // ! Create Order
  createOrder: async (req: Request, res: Response) => {
    const parsed = createOrderZodSchema.safeParse(req);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.errors });
      return;
    }

    const { items, shippingInfo, paymentMethod } = parsed.data.body;

    const authenticatedUserId = req.user?._id;
    if (!authenticatedUserId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    // 🔥 Optional: Calculate total based on DB Book Price
    const totalAmount = items.reduce(
      (sum, item) => sum + item.quantity * 1, // Later fetch book price if needed
      0
    );

    const order = await OrderService.createOrder({
      user: new Types.ObjectId(authenticatedUserId),
      items,
      shippingInfo,
      paymentMethod,
      paymentStatus: paymentMethod === "COD" ? "Pending" : "Pending",
      totalAmount,
      orderStatus: "Processing",
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order,
    });
  },

  // ! Get My Orders
  getMyOrders: async (req: Request, res: Response) => {
    const authenticatedUserId = req.user?._id;
    if (!authenticatedUserId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const orders = await OrderService.getMyOrders(authenticatedUserId);

    res.status(200).json({
      success: true,
      message: "Orders retrieved successfully",
      data: orders,
    });
  },

  // ! Get Single Order
  getSingleOrder: async (req: Request, res: Response) => {
    const authenticatedUserId = req.user?._id;
    if (!authenticatedUserId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const orderId = req.params.id;

    const order = await OrderService.getSingleOrder(
      orderId,
      authenticatedUserId
    );

    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Order retrieved successfully",
      data: order,
    });
  },

  // ! Update Order Status (Admin/Store-Manager use only)
  updateOrderStatus: async (req: Request, res: Response) => {
    const orderId = req.params.id;
    const { status: updatedStatus } = req.body;

    if (!updatedStatus) {
      res.status(400).json({ message: "Status is required" });
      return;
    }

    const order = await OrderService.updateOrderStatus(orderId, updatedStatus);

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: order,
    });
  },

  // ! Update Payment Status (SSLCommerz success callback)
  updatePaymentStatus: async (req: Request, res: Response) => {
    const orderId = req.params.id;

    const order = await OrderService.updatePaymentStatus(orderId);

    res.status(200).json({
      success: true,
      message: "Payment status updated successfully",
      data: order,
    });
  },
};
