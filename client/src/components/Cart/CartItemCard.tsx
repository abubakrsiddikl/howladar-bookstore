"use client";

import { CartItem } from "@/context/CartContext";
import { useCartContext } from "@/hooks/useCartContext";
import Image from "next/image";

export default function CartItemCard({ item }: { item: CartItem }) {
  const { updateQuantity, removeFromCart } = useCartContext();

  return (
    <div className="flex gap-4 border p-4 rounded-md shadow">
      <Image
        src={item.book.coverImage}
        alt={item.book.title}
        width={80}
        height={24}
        className="object-contain rounded"
      />
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{item.book.title}</h3>
        <p className="text-gray-600">৳ {item.book.price}</p>
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() =>
              item.quantity > 1 &&
              updateQuantity(item._id || item.book._id, item.quantity - 1)
            }
            className="px-2 py-1 border rounded"
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button
            onClick={() =>
              updateQuantity(item._id || item.book._id, item.quantity + 1)
            }
            className="px-2 py-1 border rounded"
          >
            +
          </button>
        </div>
        <button
          onClick={() => removeFromCart(item._id || item.book._id)}
          className="text-red-500 mt-2"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
