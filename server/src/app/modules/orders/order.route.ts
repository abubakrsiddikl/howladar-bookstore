import express from "express";


import { authenticate, authorize } from "../auth/auth.middleware";
import { OrderController } from "./order.controller";

const router = express.Router();

router.post("/", authenticate, authorize("customer", "store-manager", "admin"), OrderController.createOrder);
router.get("/", authenticate, OrderController.getUserOrders);

export const OrderRoutes = router;
