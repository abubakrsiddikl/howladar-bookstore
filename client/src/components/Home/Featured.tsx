import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Featured() {
  return (
    <div>
      {" "}
      {/* Featured Books */}
      <section className="py-12 px-4 md:px-10 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          ✨ ফিচারড বইসমূহ
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((book) => (
            <div
              key={book}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              <Image
                src=""
                height={400}
                width={500}
                alt="book"
                className="h-48 w-full object-cover rounded"
              />
              <h3 className="mt-4 font-semibold text-lg">বইয়ের নাম {book}</h3>
              <p className="text-sm text-gray-500">লেখক: জন ডো</p>
              <p className="text-blue-700 font-bold mt-2">৳ ২৫০</p>
            </div>
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
