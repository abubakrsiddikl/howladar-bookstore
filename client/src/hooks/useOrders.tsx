"use client";

import { axiosSecure } from "@/lib/axios";
import { useEffect, useState } from "react";
import { IOrder } from "@/types/order"; // 

export const useOrders = (search: string, status: string) => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await axiosSecure.get("/order", {
          params: { search, status },
        });
        setOrders(res.data.data);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [search, status]);

  return { orders, loading };
};
