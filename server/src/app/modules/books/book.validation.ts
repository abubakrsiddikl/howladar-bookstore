import { z } from "zod";

export const createBookZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
    }),
    author: z.string({
      required_error: "Author is required",
    }),
    price: z
      .number({
        required_error: "Price is required",
      })
      .min(0, "Price cannot be negative"),
    stock: z
      .number({
        required_error: "Stock is required",
      })
      .min(0, "Stock cannot be negative"),
    genre: z.enum([
      "FICTION",
      "NON_FICTION",
      "SCIENCE",
      "HISTORY",
      "BIOGRAPHY",
      "FANTASY",
      "TECHNOLOGY",
      "ISLAMIC",
    ]),
    description: z.string().optional(),
    coverImage: z.string({
      required_error: "Cover image is required",
    }),
    available: z.boolean().optional(),
  }),
});
