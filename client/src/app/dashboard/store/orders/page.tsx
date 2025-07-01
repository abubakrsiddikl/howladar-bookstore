"use client";

import { OrderTable } from "@/components/Order/OrderTable";
import { useOrders } from "@/hooks/useOrders";
import { useState } from "react";

const StoreOrderPage = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const { orders, loading } = useOrders(search, status, "");

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">All Orders</h1>

      {/* Search Box */}
      <div className="mb-4 flex items-center gap-2">
        <input
          type="text"
          placeholder="Search by Order ID / Phone / Address"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded-md w-full max-w-sm"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Status</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Loading */}
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <OrderTable orders={orders} />
      )}
    </div>
  );
};

export default StoreOrderPage;
