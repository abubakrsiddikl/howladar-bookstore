"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "./components/BookCard";

interface Book {
  _id: string;
  title: string;
  author: string;
  price: number;
  genre: string;
  stock: number;
  coverImage: string;
  available: boolean;
}

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState("");

  const fetchBooks = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/books`
      );
      setBooks(res.data.data?.books);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);
  console.log(books);

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold text-center mb-6">📚 আমাদের বইসমূহ</h1>

      {/* Search */}
      <div className="max-w-md mx-auto mb-6">
        <input
          type="text"
          placeholder="খুঁজুন বইয়ের নাম, লেখক বা genre"
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {books.length > 0 ? (
          books.map((book) => <BookCard key={book._id} {...book}></BookCard>)
        ) : (
          <p className="col-span-3 text-center text-gray-600">
            😔 কোনো বই পাওয়া যায়নি।
          </p>
        )}
      </div>
    </div>
  );
}
