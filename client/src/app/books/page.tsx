"use client";

import { useState } from "react";
import BookCard from "./components/BookCard";

import { useBooks } from "@/hooks/useBooks";

export default function BooksPage() {
  const [search, setSearch] = useState("");
  const { books, loading, error } = useBooks(search);
  if (loading) {
    return <p>Loadin...</p>;
  }

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
