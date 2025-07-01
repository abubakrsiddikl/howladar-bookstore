"use client";

import { useOrders } from "@/hooks/useOrders";
import { format } from "date-fns";

const RecentOrders = () => {
  const { orders } = useOrders("", "", "5");

  return (
    <div className="bg-white p-4 mt-7 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
      <ul className="space-y-2">
        {orders.map((order) => (
          <li key={order._id} className="border p-2 rounded">
            <p className="font-medium">Order ID: {order.orderId}</p>
            <p className="text-sm">Status: {order.orderStatus}</p>
            <p className="text-sm">
              Date: {format(new Date(order.createdAt), "dd MMM yyyy")}
            </p>
          </li>
        ))}
      </ul>
      {orders.length === 0 && <p>No orders found.</p>}
    </div>
  );
};

export default RecentOrders;
