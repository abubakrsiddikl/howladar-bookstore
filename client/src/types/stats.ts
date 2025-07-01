// src/types/stats.ts

export interface IAdminStats {
  totalUsers: number;
  totalOrders: number;
  totalBooks: number;
  totalSales: number;
  delivered: number;
  processing: number;
  cancelled: number;
}
