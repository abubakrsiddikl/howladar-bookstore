"use client";

import { axiosSecure } from "@/lib/axios";
import { IOrder } from "@/types/order";
import { format } from "date-fns";
import { useState } from "react";
import toast from "react-hot-toast";

const OrderDetails = ({ order }: { order: IOrder }) => {
  const [status, setStatus] = useState<IOrder["orderStatus"]>(
    order.orderStatus
  );

  // Status Update Handler
  const handleStatusUpdate = async () => {
    try {
      await axiosSecure.patch(`/order/${order._id}/status`, { status });
      toast.success(`Order Status is now ${status}`);
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-md shadow">
      <h2 className="text-2xl font-semibold mb-4">Order ID: {order.orderId}</h2>

      {/*  Customer Info */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Customer Info</h3>
        <p>
          <strong>Name:</strong> {order.shippingInfo?.name || "N/A"}
        </p>
        <p>
          <strong>Phone:</strong> {order.shippingInfo?.phone}
        </p>
        <p>
          <strong>Address:</strong> {order.shippingInfo?.address}
        </p>
      </div>

      {/* Items */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Items</h3>
        <ul className="space-y-2">
          {order.items.map((item, idx) => (
            <li key={idx} className="border p-3 rounded-md">
              <p>
                <span className="font-semibold">{item.book.title}</span> ×{" "}
                {item.quantity}
              </p>
              <p>৳ {item.book.price} each</p>
            </li>
          ))}
        </ul>
      </div>

      {/* ✅ Payment Info */}
      <div className="mb-6">
        <p>
          <strong>Payment Method:</strong> {order.paymentMethod}
        </p>
        <p>
          <strong>Payment Status:</strong> {order.paymentStatus}
        </p>
        <p>
          <strong>Total:</strong> ৳ {order.totalAmount}
        </p>
        <p>
          <strong>Order Date:</strong>{" "}
          {format(new Date(order.createdAt), "dd MMM yyyy")}
        </p>
      </div>

      {/* ✅ Status Update */}
      <div className="mb-6">
        <label className="block mb-1">Order Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as IOrder["orderStatus"])}
          className="border px-3 py-2 rounded w-full max-w-sm"
        >
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <button
          onClick={handleStatusUpdate}
          className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Update Status
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
