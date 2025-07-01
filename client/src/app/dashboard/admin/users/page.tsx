"use client";
import UserTable from "@/components/User/UserTable";
import { useState } from "react";

const UsersPage = () => {
  const [search, setSearch] = useState("");
  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold mb-6">All Users</h1>
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search by Order ID / Phone / Address"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded-md w-full max-w-sm"
        />
      </div>

      <UserTable search={search} />
    </div>
  );
};

export default UsersPage;
