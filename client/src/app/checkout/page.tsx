"use client";

import OrderSummary from "@/components/Checkout/OrderSummary";
import PaymentMethod from "@/components/Checkout/PaymentMethod";
import ShippingForm from "@/components/Checkout/ShippingForm";
import { useAuth } from "@/context/AuthContext";
import { useCartContext } from "@/hooks/useCartContext";
import { axiosSecure } from "@/lib/axios";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const { cart, clearCart } = useCartContext();
  const { user } = useAuth();
  const router = useRouter();

  const [shippingInfo, setShippingInfo] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.book.price * item.quantity,
    0
  );
  const onlineFee = paymentMethod === "SSLCommerz" ? 50 : 0;
  const total = subtotal + onlineFee;

  const handlePlaceOrder = async () => {
    if (!shippingInfo.phone || !shippingInfo.address) {
      toast.error("⚠️ ঠিকানা এবং ফোন নাম্বার দিন।");
      return;
    }
    setLoading(true);
    try {
      // create order info
      const payload = {
        items: cart.map((item) => ({
          book: item.book._id,
          quantity: item.quantity,
        })),
        shippingInfo,
        paymentMethod,
      };
      // create a order to db
      const res = await axiosSecure.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/order`,
        payload
      );
      console.log(res.data);
      if (res.data) {
        toast.success("Your order has been saved successfully");
      }

      if (paymentMethod === "SSLCommerz" && res.data.paymentUrl) {
        router.push(res.data.paymentUrl);
      } else {
        clearCart();
        router.push(`/ordersuccess?orderId=${res.data.data?.orderId}`);
      }
    } catch (error) {
      console.error(error);
      alert("❌ অর্ডার করতে সমস্যা হয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        <ShippingForm
          shippingInfo={shippingInfo}
          setShippingInfo={setShippingInfo}
        />
        <PaymentMethod
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
        />
      </div>

      <OrderSummary
        subtotal={subtotal}
        onlineFee={onlineFee}
        total={total}
        handlePlaceOrder={handlePlaceOrder}
        loading={loading}
        disabled={cart.length === 0}
      />
    </div>
  );
}
