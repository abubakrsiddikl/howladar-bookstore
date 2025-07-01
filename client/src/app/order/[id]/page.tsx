"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { axiosSecure } from "@/lib/axios";

interface Order {
  _id: string;
  orderId: string;
  totalAmount: number;
  orderStatus: string;
  paymentStatus: string;
  createdAt: string;
  items: {
    book: {
      title: string;
      coverImage: string;
    };
    quantity: number;
  }[];
  shippingInfo: {
    name: string;
    email: string;
    address: string;
    phone: string;
    division: string;
    district: string;
    city: string;
  };
}

export default function OrderDetailsPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchOrder = async () => {
      //   if (!user) {
      //     router.push("/login");
      //   }
      try {
        const res = await axiosSecure.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/order/${id}`
        );
        setOrder(res.data.data);
      } catch (error) {
        console.error("Failed to fetch order:", error);
      }
    };

    if (id) {
      fetchOrder();
    }
  }, [id, user, router]);

  const handleDownloadInvoice = () => {
    // 👇 Placeholder for Invoice Download
    alert("🧾 Invoice Download Coming Soon!");
  };

  if (!order) {
    return <p className="text-center mt-10">লোড হচ্ছে...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">
            🆔 অর্ডার আইডি: {order.orderId}
          </h1>
          <p className="text-sm text-gray-600">
            {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="space-x-2">
          <button
            onClick={handleDownloadInvoice}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            ইনভয়েস ডাউনলোড
          </button>
        </div>
      </div>

      <div className="border rounded-md p-4 mb-6">
        <h2 className="font-semibold mb-2">🚚 Shipping Info:</h2>
        <p>👤 নাম: {order.shippingInfo.name}</p>
        <p>📧 ইমেল: {order.shippingInfo.email}</p>
        <p>📞 ফোন: {order.shippingInfo.phone}</p>
        <p>📍 ঠিকানা: {order.shippingInfo.address}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {order.items.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 border p-3 rounded"
          >
            <Image
              src={item.book.coverImage}
              alt={item.book.title}
              width={64}
              height={80}
              className="object-cover rounded"
            />
            <div>
              <p className="font-medium">{item.book.title}</p>
              <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6">
        <p className="font-bold text-blue-600">মোট: ৳ {order.totalAmount}</p>
        <div className="space-x-2">
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              order.orderStatus === "Processing"
                ? "bg-yellow-100 text-yellow-800"
                : order.orderStatus === "Delivered"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {order.orderStatus}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              order.paymentStatus === "Paid"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {order.paymentStatus}
          </span>
        </div>
      </div>
    </div>
  );
}
