"use client";
import BookCard from "@/app/books/components/BookCard";
import { useBooks } from "@/hooks/useBooks";
import Link from "next/link";
import React from "react";

export default function Featured() {
  const { books } = useBooks("");
  const featureBooks = books.slice(1, 5);
  // console.log(featureBooks);
  return (
    <div>
      {/* Featured Books */}
      <section className="py-12 px-4 w-11/12 mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          ✨ ফিচারড বইসমূহ
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          {featureBooks.map((book) => (
            <BookCard key={book._id} {...book}></BookCard>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/books">
            <button className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800">
              সব বই দেখুন
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
