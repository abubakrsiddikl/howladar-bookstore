"use client";

import { useAuth } from "@/context/AuthContext";
// import { axiosSecure } from "@/lib/axios";
import { useState } from "react";

const ProfilePage = () => {
  const { user } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    // try {
    //   const res = await axiosSecure.patch("/users/update-profile", {
    //     name,
    //     phone,
    //   });

    //   // ✅ Update context
    //   setUser(res.data.data);

    //   alert("Profile updated successfully");
    // } catch (error) {
    //   console.error(error);
    //   alert("Failed to update");
    // }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-3xl font-semibold mb-6">My Profile</h1>

      <div className="space-y-4">
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone || "Not provided"}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
      </div>

      <hr className="my-6" />

      <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            className="w-full border px-3 py-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1">Phone</label>
          <input
            className="w-full border px-3 py-2 rounded"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Optional"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
