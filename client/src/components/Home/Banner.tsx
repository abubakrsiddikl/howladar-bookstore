import Link from "next/link";
import React from "react";

export default function BannerSection() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          হাওলাদার প্রকাশনী
        </h1>
        <p className="text-lg md:text-xl">
          আপনার প্রিয় বইয়ের নির্ভরযোগ্য ঠিকানা
        </p>
        <Link href="/books">
          <button className="mt-6 bg-white text-blue-900 font-semibold px-6 py-2 rounded hover:bg-gray-200">
            এখনই বই দেখুন
          </button>
        </Link>
      </section>
    </div>
  );
}
