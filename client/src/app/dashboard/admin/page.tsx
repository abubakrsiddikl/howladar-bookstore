import AdminDashboardSummary from "@/components/Dashboard/AdminDashboardSummary";
import RecentOrders from "@/components/Dashboard/RecentOrders";
import React from "react";

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <AdminDashboardSummary />
      <RecentOrders></RecentOrders>
    </div>
  );
}
