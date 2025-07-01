import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import useDebounce from "./useDebounce";
import { axiosSecure } from "@/lib/axios";
import Swal from "sweetalert2";

export interface Book {
  _id: string;
  title: string;
  author: string;
  price: number;
  genre: string;
  coverImage: string;
  stock: number;
  available: boolean;
  description?: string;
}

export const useBooks = (search: string) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const debouncedSearch = useDebounce(search, 500);
  const [error, setError] = useState<string | null>(null);

  // Fetch Books Function
  const fetchBooks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/books`,
        {
          params: { search: debouncedSearch },
        }
      );
      setBooks(res.data.data?.books || []);
    } catch {
      setError("Failed to fetch books");
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch]);

  // Fetch Books on Search Change
  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  //  Handle Delete
  const handleDelete = async (id: string, bookTitle: string) => {
    const result = await Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: `আপনি এই "${bookTitle}" বইটি মুছে ফেলতে চান?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "বাতিল",
      confirmButtonText: "হ্যাঁ, মুছে ফেলুন!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/books/${id}`);
        fetchBooks();
        Swal.fire({
          title: "মুছে ফেলা হয়েছে!",
          text: `"${bookTitle}" বইটি সফলভাবে মুছে ফেলা হয়েছে।`,
          icon: "success",
        });
      } catch {
        Swal.fire({
          title: "ত্রুটি!",
          text: "বইটি মুছে ফেলা যায়নি। আবার চেষ্টা করুন।",
          icon: "error",
        });
      }
    }
  };

  return { books, loading, error, handleDelete };
};
