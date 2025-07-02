"use client";

import { useState } from "react";
import { useBooks } from "@/hooks/useBooks";
import Link from "next/link";
import Image from "next/image";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { books, loading } = useBooks(search);

  return (
    <div className="  shadow p-5 z-50 ">
      <input
        type="text"
        placeholder="🔍 খুঁজুন বইয়ের নাম, লেখক বা genre"
        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500  bg-white"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {search && (
        <div className="absolute z-10 bg-white  w-full mt-1 rounded-md shadow-2xl max-h-[400px] overflow-y-auto">
          {loading ? (
            <p className="p-4">লোড হচ্ছে...</p>
          ) : books.length > 0 ? (
            books.map((book) => (
              <Link
                key={book._id}
                href={`/bookdetails/${book._id}`}
                className="flex gap-3 items-center px-4 py-2 hover:bg-blue-50"
              >
                <div className="w-12 h-16 relative">
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{book.title}</h3>
                  <p className="text-xs text-gray-600">{book.author}</p>
                </div>
              </Link>
            ))
          ) : (
            <p className="p-4 text-sm text-gray-600">😔 কোনো বই পাওয়া যায়নি।</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
