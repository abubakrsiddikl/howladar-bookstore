import { useEffect, useState } from "react";
import axios from "axios";

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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/books`,
          {
            params: { search },
          }
        );
        setBooks(res.data.data?.books || []);
      } catch {
        setError("Failed to fetch books");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return { books, loading, error };
};
