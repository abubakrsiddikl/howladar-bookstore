import express from "express";
import { authenticate, authorize } from "../auth/auth.middleware";
import { OrderController } from "./order.controller";

const router = express.Router();

// ! Create Order (Only logged-in users)
router.post("/", authenticate, OrderController.createOrder);

// ! Get My Orders (Only logged-in users)
router.get("/my-orders", authenticate, OrderController.getMyOrders);

// ! Get Single Order (Only logged-in users)
router.get("/:orderId", authenticate, OrderController.getSingleOrder);

// !Update Order Status (Only admin and store-manager)
router.patch(
  "/:orderId/status",
  authenticate,
  authorize("admin", "store-manager"),
  OrderController.updateOrderStatus
);

// ! Update Payment Status (SSLCommerz Payment Success Callback etc.)
router.patch("/:orderId/pay", OrderController.updatePaymentStatus);

export const OrderRoutes = router;
