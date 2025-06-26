"use client";
import BookCard from "./components/BookCard";
import { useBooks } from "@/hooks/useBooks";
import SearchInput from "@/components/SearchInput";
import LoadingSppiner from "@/components/LoadingSppiner";

export default function BooksPage() {
  const { books, loading } = useBooks("");
  if (loading) {
    return <LoadingSppiner></LoadingSppiner>;
  }
  console.log(books);
  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold text-center mb-6">📚 আমাদের বইসমূহ</h1>

      {/* Search */}
      <div className="pb-3">
        <SearchInput></SearchInput>
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
