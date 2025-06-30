"use client";

import { IOrder } from "@/types/order";
import { format } from "date-fns";
import Link from "next/link";

interface OrderTableProps {
  orders: IOrder[];
}

export const OrderTable = ({ orders }: OrderTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3 border">Order ID</th>
            <th className="p-3 border">Customer</th>
            <th className="p-3 border">Phone</th>
            <th className="p-3 border">Payment</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border">Total</th>
            <th className="p-3 border">Date</th>
            <th className="p-3 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="hover:bg-gray-100">
              <td className="p-3 border">{order.orderId}</td>
              <td className="p-3 border">{order.shippingInfo?.name || "N/A"}</td>
              <td className="p-3 border">{order.shippingInfo?.phone}</td>
              <td className="p-3 border">{order.paymentMethod}</td>
              <td className="p-3 border">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    order.orderStatus === "Delivered"
                      ? "bg-green-200 text-green-700"
                      : order.orderStatus === "Cancelled"
                      ? "bg-red-200 text-red-700"
                      : "bg-yellow-200 text-yellow-700"
                  }`}
                >
                  {order.orderStatus}
                </span>
              </td>
              <td className="p-3 border">৳ {order.totalAmount}</td>
              <td className="p-3 border">
                {format(new Date(order.createdAt), "dd MMM yyyy")}
              </td>
              <td className="p-3 border">
                <Link
                  href={`/dashboard/store/orders/${order._id}`}
                  className="text-blue-600 hover:underline"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {orders.length === 0 && (
        <div className="text-center p-4 text-gray-500">No orders found.</div>
      )}
    </div>
  );
};
