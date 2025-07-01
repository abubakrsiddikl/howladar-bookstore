import { axiosSecure } from "@/lib/axios";
import { IUser } from "@/types/user";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export const useUsers = (search: string) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosSecure.get(`/users?search=${search}`);
      setUsers(res.data.data);
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const updateRole = async (id: string, name: string, role: string) => {
    const result = await Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: `আপনি এই ${name} কে ${role} বানাতে চান?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "না",
      confirmButtonText: "হ্যাঁ !",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.patch(`/users/${id}/role`, { role });
        toast.success(`This user update successfull`);
        fetchUsers();
        Swal.fire({
          title: `${role} করে  ফেলা হয়েছে!`,
          text: `"${name}" ইউজার কে  সফলভাবে ${role} করে ফেলা হয়েছে।`,
          icon: "success",
        });
      } catch {
        Swal.fire({
          title: "ত্রুটি!",
          text: `ইউজার কে ${role}  ফেলা যায়নি। আবার চেষ্টা করুন।`,
          icon: "error",
        });
      }
    }
  };

  return { users, loading, updateRole };
};
