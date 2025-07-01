"use client";

import { axiosSecure } from "@/lib/axios";
import { IAdminStats } from "@/types/stats";
import { useEffect, useState } from "react";
import LoadingSppiner from "../LoadingSppiner";

const AdminDashboardSummary = () => {
  const [data, setData] = useState<IAdminStats | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const [userRes, orderRes, bookRes] = await Promise.all([
          axiosSecure.get("/users/stats"),
          axiosSecure.get("/order/stats"),
          axiosSecure.get("/books/stats"),
        ]);

        setData({
          totalUsers: userRes.data.data.totalUsers,
          totalOrders: orderRes.data.data.totalOrders,
          delivered: orderRes.data.data.delivered,
          processing: orderRes.data.data.processing,
          cancelled: orderRes.data.data.cancelled,
          totalSales: orderRes.data.data.totalSales,
          totalBooks: bookRes.data.data.totalBooks,
        });
      } catch (error) {
        console.error("Failed to fetch stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <LoadingSppiner></LoadingSppiner>;
  }

  if (!data) {
    return <p className="text-center">No data available</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-blue-100 p-5 rounded shadow">
        <h3 className="text-lg font-semibold">Total Users</h3>
        <p className="text-3xl">{data?.totalUsers}</p>
      </div>
      <div className="bg-green-100 p-5 rounded shadow">
        <h3 className="text-lg font-semibold">Total Orders</h3>
        <p className="text-3xl">{data?.totalOrders}</p>
      </div>
      <div className="bg-yellow-100 p-5 rounded shadow">
        <h3 className="text-lg font-semibold">Total Books</h3>
        <p className="text-3xl">{data?.totalBooks}</p>
      </div>
      <div className="bg-purple-100 p-5 rounded shadow">
        <h3 className="text-lg font-semibold">Total Sales</h3>
        <p className="text-3xl">৳ {data?.totalSales}</p>
      </div>
      <div className="bg-orange-100 p-5 rounded shadow">
        <h3 className="text-lg font-semibold">Delivered Orders</h3>
        <p className="text-3xl">{data?.delivered}</p>
      </div>
      <div className="bg-red-100 p-5 rounded shadow">
        <h3 className="text-lg font-semibold">Cancelled Orders</h3>
        <p className="text-3xl">{data?.cancelled}</p>
      </div>
    </div>
  );
};

export default AdminDashboardSummary;
