"use client";

import { useUsers } from "@/hooks/useUsers";
import { IUser } from "@/types/user";
import LoadingSppiner from "../LoadingSppiner";

interface UserTableProps {
  search: string;
}

const UserTable = ({ search }: UserTableProps) => {
  const { users, loading, updateRole } = useUsers(search);

  if (loading) {
    return <LoadingSppiner></LoadingSppiner>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Email</th>
            <th className="p-3 border">Role</th>
            <th className="p-3 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: IUser) => (
            <tr key={user._id} className="hover:bg-gray-50">
              <td className="p-3 border">{user.name}</td>
              <td className="p-3 border">{user.email}</td>
              <td className="p-3 border capitalize">{user.role}</td>
              <td className="p-3 border">
                <select
                  value={user.role}
                  onChange={(e) =>
                    updateRole(user._id, user.name, e.target.value)
                  }
                  className="border px-2 py-1 rounded"
                >
                  <option value="customer">Customer</option>
                  <option value="store-manager">Store Manager</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {users.length === 0 && (
        <div className="text-center p-4 text-gray-500">No users found.</div>
      )}
    </div>
  );
};

export default UserTable;
