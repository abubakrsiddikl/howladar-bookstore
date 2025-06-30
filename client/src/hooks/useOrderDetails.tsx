"use client";

import { axiosSecure } from "@/lib/axios";
import { IOrder } from "@/types/order";
import { useEffect, useState } from "react";

export const useOrderDetails = (id: string | undefined) => {
  const [order, setOrder] = useState<IOrder | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;

    const fetchOrder = async () => {
      setLoading(true);
      try {
        const res = await axiosSecure.get(`/order/${id}`);
        setOrder(res.data.data);
      } catch (error) {
        console.error("Failed to fetch order", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  return { order, loading };
};
