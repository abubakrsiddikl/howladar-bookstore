import type { Request, Response } from "express";
import { startSession, Types } from "mongoose";
import { OrderService } from "./order.service";
import { IOrderItem } from "./order.interface";
import { Book } from "../books/book.model";
import { getNextOrderId } from "./order.helper";
import { sendEmail } from "../../utils/sendEmail";
import { orderEmailTemplate } from "../../utils/emailTemplates";
import { User } from "../auth/user.model";

export const OrderController = {
  // ! Create Order
  // ! Create Order
  createOrder: async (req: Request, res: Response) => {
    const session = await startSession();
    session.startTransaction();

    try {
      const { items, shippingInfo, paymentMethod } = req.body;
      const authenticatedUserId = req.user?.userId;

      if (!authenticatedUserId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      let totalAmount = 0;
      const validatedItems: IOrderItem[] = [];

      //  Book Check and Stock Validation
      for (const item of items) {
        const book = await Book.findOneAndUpdate(
          {
            _id: item.book,
            available: true,
            stock: { $gte: item.quantity },
          },
          {
            $inc: { stock: -item.quantity },
          },
          { new: true, session }
        );

        if (!book) {
          await session.abortTransaction();
          session.endSession();
          res.status(400).json({
            message: `Book not found or insufficient stock: ${item.book}`,
          });
          return;
        }

        if (book.stock === 0) {
          await Book.findByIdAndUpdate(
            item.book,
            { available: false },
            { session }
          );
        }

        totalAmount += book.price * item.quantity;

        validatedItems.push({
          book: new Types.ObjectId(item.book),
          quantity: item.quantity,
        });
      }

      const orderId = await getNextOrderId();

      //  Create Order
      const order = await OrderService.createOrder(
        {
          user: new Types.ObjectId(authenticatedUserId),
          items: validatedItems,
          shippingInfo,
          paymentMethod,
          paymentStatus: paymentMethod === "COD" ? "Pending" : "Pending",
          totalAmount,
          orderStatus: "Processing",
          orderId,
        },
        session
      );

      await session.commitTransaction();
      session.endSession();

      // =============================
      //  Email Notification Section
      // =============================

      const user = await User.findById(authenticatedUserId);
      if (!user?.email) {
        throw new Error("Customer email not found");
      }
      const admins = await User.find({
        role: { $in: ["admin", "store-manager"] },
      });

      const adminEmails = admins.map((a) => a.email);
      const customerEmail = user.email;

      const subject = `New Order Placed: ${order.orderId}`;

      const htmlTemplate = orderEmailTemplate(
        order.orderId,
        order.totalAmount,
        user.name,
        paymentMethod,
        shippingInfo.address,
        shippingInfo.phone,
        shippingInfo.division,
        shippingInfo.district,
        shippingInfo.city
      );

      // Send Email to Admins/Store-Manager
      await sendEmail(adminEmails.join(","), subject, htmlTemplate);

      //  Send Email to Customer
      await sendEmail(
        customerEmail,
        `Order Confirmation: ${order.orderId}`,
        htmlTemplate
      );

      // Response
      res.status(201).json({
        success: true,
        message: "Order created successfully. Email sent.",
        data: order,
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error("Order creation error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  // ! Get all orders
  getAllOrders: async (req: Request, res: Response) => {
    try {
      const { search, status, limit } = req.query;
      const queryLimit = Number(limit) || 10;

      const orders = await OrderService.getAllOrders(
        search as string,
        status as string,
        queryLimit
      );

      res.status(200).json({
        success: true,
        message: "All orders fetched successfully",
        data: orders,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch orders",
        error,
      });
    }
  },
  // ! get order statics
  getOrderStats: async (req: Request, res: Response) => {
    try {
      const stats = await OrderService.getOrderStats();

      res.status(200).json({
        success: true,
        message: "Order statistics retrieved successfully",
        data: stats,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch order statistics",
      });
    }
  },

  // ! Get My Orders
  getMyOrders: async (req: Request, res: Response) => {
    const authenticatedUserId = req.user?.userId;
    const search = req.query.search as string;
    if (!authenticatedUserId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const orders = await OrderService.getMyOrders(authenticatedUserId, search);

    res.status(200).json({
      success: true,
      message: "Orders retrieved successfully",
      data: orders,
    });
  },

  // ! Get Single Order only store manger and admin
  getSingleOrder: async (req: Request, res: Response) => {
    const orderId = req.params.orderId;

    const order = await OrderService.getSingleOrder(orderId);

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
    const orderId = req.params.orderId;
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
