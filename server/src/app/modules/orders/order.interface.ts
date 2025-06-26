import { Types } from "mongoose";

export interface IOrderItem {
  book: string;
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
  user: Types.ObjectId;
  items: IOrderItem[];
  shippingInfo: IShippingInfo;
  paymentMethod: IPaymentMethod;
  paymentStatus: "Paid" | "Pending";
  totalAmount: number;
  orderStatus: "Processing" | "Delivered" | "Cancelled";
  createdAt?: Date;
  updatedAt?: Date;
}
