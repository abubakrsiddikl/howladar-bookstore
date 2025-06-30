"use client";

import OrderDetails from "@/components/Order/OrderDetails";
import { useOrderDetails } from "@/hooks/useOrderDetails";
import { IOrder } from "@/types/order";
import { useParams } from "next/navigation";

const StoreOrderDetailsPage = () => {
  const { id } = useParams();
  const { order, loading } = useOrderDetails(id as string);

  if (loading) return <p>Loading...</p>;
  if (!order) return <p>Order not found!</p>;
  console.log(order);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Order Details</h1>
      <OrderDetails order={order as IOrder} />
    </div>
  );
};

export default StoreOrderDetailsPage;
