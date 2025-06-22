import { z } from "zod";

export const createBookZodSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    author: z.string().min(1, "Author is required"),
    category: z.string().min(1, "Category is required"),
    price: z.number().nonnegative("Price must be non-negative"),
    stock: z.number().int().nonnegative("Stock must be a positive integer"),
    coverImage: z.string().url("Cover image must be a valid URL"),
  }),
});
