"use client";

import CartItemCard from "@/components/Cart/CartItemCard";
import { useCartContext } from "@/hooks/useCartContext";
import Link from "next/link";

export default function CartPage() {
  const { cart, clearCart } = useCartContext();

  const total = cart.reduce(
    (sum, item) => sum + item.book.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-10">
        <h2 className="text-2xl font-semibold">Your cart is empty 😢</h2>
        <Link
          href="/books"
          className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded"
        >
          Browse Books
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h2 className="text-2xl font-semibold mb-6">🛒 Your Cart</h2>

      <div className="flex flex-col gap-4">
        {cart.map((item) => (
          <CartItemCard key={item._id || item.book._id} item={item} />
        ))}
      </div>

      <div className="mt-6 border-t pt-4 flex justify-between items-center">
        <p className="text-xl font-semibold">Total: ৳ {total}</p>
        <div className="flex gap-3">
          <button
            onClick={clearCart}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Clear Cart
          </button>
          <Link
            href="/checkout"
            className="bg-green-600 text-white px-5 py-2 rounded"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
