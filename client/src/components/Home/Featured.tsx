"use client";

import { useBooks } from "@/hooks/useBooks";

import LoadingSppiner from "@/components/LoadingSppiner";
import BookCard from "@/components/Books/BookCard";

export default function BooksPage() {
  const { books, loading } = useBooks("");
  if (loading) {
    return <LoadingSppiner></LoadingSppiner>;
  }
  // console.log(books);
  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold text-center mb-6">📚 আমাদের বইসমূহ</h1>
      {/* Books Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-5">
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
