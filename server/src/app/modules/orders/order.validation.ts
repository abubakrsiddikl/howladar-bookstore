
import { z } from "zod";

export const bookItemSchema = z.object({
  bookId: z.string().min(1, "Book ID is required"),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
});

export const createOrderSchema = z.object({
  body: z.object({
    books: z.array(bookItemSchema).min(1, "At least one book is required"),
    address: z.string().min(5, "Address is too short"),
    paymentMethod: z.enum(["sslcommerz", "cash-on-delivery"]),
  }),
});
