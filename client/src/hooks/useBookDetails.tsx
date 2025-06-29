import { useEffect, useState } from "react";
import axios from "axios";

interface Book {
  _id: string;
  title: string;
  author: string;
  price: number;
  genre: string;
  coverImage: string;
  available: boolean;
  description?: string;
  stock: number;
}

export const useBookDetails = (id: string | string[] | undefined) => {
  const [book, setBook] = useState<Book | null>(null);
  const [similarBooks, setSimilarBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchBook = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/books/${id}`
      );
      setBook(res.data.data);

      const genre = res.data.data.genre;
      const similarBookGet = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/books?genre=${genre}`
      );

      // all similar book are store thi variable
      const allSimilarBook = similarBookGet.data.data.books;
      // filtered similar book
      const filtered = allSimilarBook.filter((b: Book) => b._id !== id);
      setSimilarBooks(filtered);
    } catch (error) {
      console.error("Error fetching book:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchBook();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return { book, similarBooks, loading };
};
