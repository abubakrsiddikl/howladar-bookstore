"use client";

import { createContext, useEffect, useState } from "react";

import { useAuth } from "./AuthContext";
import { axiosSecure } from "@/lib/axios";

export interface CartItem {
  _id?: string;
  book: {
    _id: string;
    title: string;
    coverImage: string;
    price: number;
  };
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { user } = useAuth();

  // Load Cart
  useEffect(() => {
    const loadCart = async () => {
      if (user) {
        const res = await axiosSecure.get(`/cart/my-cart`);
        setCart(res.data.data);
      } else {
        const localCart = localStorage.getItem("cart");
        if (localCart) {
          setCart(JSON.parse(localCart));
        }
      }
    };
    loadCart();
  }, [user]);

  const saveCart = (updatedCart: CartItem[]) => {
    setCart(updatedCart);
    if (!user) {
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  // ➕ Add
  const addToCart = async (item: CartItem) => {
    if (user) {
      await axiosSecure.post(`/cart/add`, {
        book: item.book._id,
        quantity: item.quantity,
      });
      const res = await axiosSecure.get(`/cart/my-cart`);
      setCart(res.data.data);
    } else {
      const exist = cart.find((i) => i.book._id === item.book._id);
      if (exist) {
        exist.quantity += item.quantity;
        saveCart([...cart]);
      } else {
        saveCart([...cart, item]);
      }
    }
  };

  // ❌ Remove
  const removeFromCart = async (id: string) => {
    if (user) {
      await axiosSecure.delete(`/cart/remove/${id}`);
      setCart(cart.filter((i) => i._id !== id));
    } else {
      const filtered = cart.filter((i) => i.book._id !== id);
      saveCart(filtered);
    }
  };

  // 🔄 Update Quantity
  const updateQuantity = async (id: string, quantity: number) => {
    if (user) {
      await axiosSecure.patch(`/cart/update/${id}`, { quantity });
      const res = await axiosSecure.get(`/cart/my-cart`);
      setCart(res.data.data);
    } else {
      const updated = cart.map((i) =>
        i.book._id === id ? { ...i, quantity } : i
      );
      saveCart(updated);
    }
  };

  // 🗑️ Clear
  const clearCart = async () => {
    if (user) {
      await axiosSecure.delete(`/cart/clear`);
      setCart([]);
    } else {
      saveCart([]);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
