"use client";

interface ShippingInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export default function ShippingForm({
  shippingInfo,
  setShippingInfo,
}: {
  shippingInfo: ShippingInfo;
  setShippingInfo: (info: ShippingInfo) => void;
}) {
  return (
    <div className="bg-white p-5 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Name"
          value={shippingInfo.name}
          onChange={(e) =>
            setShippingInfo({ ...shippingInfo, name: e.target.value })
          }
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={shippingInfo.email}
          onChange={(e) =>
            setShippingInfo({ ...shippingInfo, email: e.target.value })
          }
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Phone"
          value={shippingInfo.phone}
          onChange={(e) =>
            setShippingInfo({ ...shippingInfo, phone: e.target.value })
          }
          className="w-full border p-2 rounded"
        />
        <textarea
          placeholder="Address"
          value={shippingInfo.address}
          onChange={(e) =>
            setShippingInfo({ ...shippingInfo, address: e.target.value })
          }
          className="w-full border p-2 rounded"
        ></textarea>
      </div>
    </div>
  );
}
