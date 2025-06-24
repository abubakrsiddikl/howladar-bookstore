import { Request, Response } from "express";
import { OrderService } from "./order.service";

export const OrderController = {
  createOrder: async (req: Request, res: Response) => {
    try {
      if (!req.user?.userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const order = await OrderService.createOrder(req.user.userId, req.body);
      res.status(201).json({ success: true, order });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  getUserOrders: async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        return;
      }

      const orders = await OrderService.getUserOrders(userId);

      res.status(200).json({ success: true, data: orders });
    } catch (error) {
      console.error("Error fetching user orders:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  },

  // Later: webhook handler for SSLCommerz payment status update
};
