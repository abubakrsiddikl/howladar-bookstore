import { Types } from "mongoose";

export interface IOrderItem {
  book: Types.ObjectId;
  quantity: number;
}

export interface IShippingInfo {
  name: string;
  email: string;
  address: string;
  phone: string;
}

export type IPaymentMethod = "COD" | "SSLCommerz";

export interface IOrder {
  _id: string;
  user: Types.ObjectId;
  items: IOrderItem[];
  shippingInfo: IShippingInfo;
  paymentMethod: IPaymentMethod;
  paymentStatus: "Paid" | "Pending";
  totalAmount: number;
  orderStatus: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  orderId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IOrderStats {
  totalOrders: number;
  delivered: number;
  processing: number;
  shipped: number;
  cancelled: number;
}