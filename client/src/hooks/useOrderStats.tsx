import { axiosSecure } from "@/lib/axios";
import { IOrderStats } from "@/types/order";
import { useEffect, useState } from "react";

export const useOrderStats = () => {
  const [stats, setStats] = useState<IOrderStats | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const res = await axiosSecure.get("/order/stats");
        setStats(res.data.data);
      } catch (error) {
        console.error("Failed to fetch stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading };
};
