import { z } from "zod";
import mongoose from "mongoose";

export const createOrderZodSchema = z.object({
  body: z.object({
    items: z
      .array(
        z.object({
          book: z
            .string()
            .refine((val) => mongoose.Types.ObjectId.isValid(val), {
              message: "Invalid Book ID",
            }),
          quantity: z.number().min(1, "Quantity must be at least 1"),
        })
      )
      .nonempty("Order must have at least one item"),
    shippingInfo: z.object({
      name: z.string().min(1, "Name is required"),
      email: z.string().email("Invalid email"),
      address: z.string().min(1, "Address is required"),
      phone: z.string().min(10, "Phone number is required"),
    }),
    paymentMethod: z.enum(["COD", "SSLCommerz"]),
  }),
});
