"use client";

import { useParams } from "next/navigation";

import Image from "next/image";
import { useBookDetails } from "@/hooks/useBookDetails";
import BookCard from "@/components/Books/BookCard";

export default function BookDetailsPage() {
  const { id } = useParams();
  // console.log(id);
  const { book, similarBooks, loading } = useBookDetails(id);

  if (loading) {
    return <p className="text-center mt-10">লোড হচ্ছে...</p>;
  }

  if (!book) {
    return <p className="text-center mt-10">বই পাওয়া যায়নি।</p>;
  }

  return (
    <div className="w-11/12 mx-auto px-4 py-8">
      {/* ✅ Book Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image */}
        <div className="relative h-96 border rounded-md">
          <Image
            src={book.coverImage}
            alt={book.title}
            fill
            className="object-contain rounded-md"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-3">
              {book.title}
            </h1>
            <p className="text-lg text-gray-600 mb-2">By {book.author}</p>
            <p className="text-sm mb-4 px-2 inline-block bg-blue-100 text-blue-800 rounded">
              {book.genre}
            </p>
            <p className="text-2xl font-semibold text-green-700 mb-4">
              ৳ {book.price}
            </p>
            <p className="text-gray-700 mb-6">{book.description}</p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700">
              Add to Cart
            </button>
            <button className="border border-blue-600 text-blue-600 px-5 py-2 rounded hover:bg-blue-50">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Similar Books */}
      {similarBooks.length > 0 ? (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Similar Books</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {similarBooks.map((b) => (
              <BookCard key={b._id} {...b}></BookCard>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-600 text-2xl text-center font-bold py-7">
          এই Genre এর আর কোনো বই নেই।
        </p>
      )}
    </div>
  );
}
