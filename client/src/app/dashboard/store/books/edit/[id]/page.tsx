"use client";

import BookForm from "@/components/Form/BookForm";
import { useBookDetails } from "@/hooks/useBookDetails";
import { useParams } from "next/navigation";

const EditBookPage = () => {
  const { id } = useParams<{ id: string }>();
  const { book, loading } = useBookDetails(id);

  if (loading) return <p>Loading...</p>;

  if (!book) return <p>Book not found.</p>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold mb-6">Edit Book</h1>
      <BookForm
        id={id}
        defaultValues={{
          title: book.title,
          author: book.author,
          genre: book.genre as
            | "উপন্যাস"
            | "গল্প"
            | "ইসলামিক"
            | "বিজ্ঞান"
            | "ইতিহাস"
            | "জীবনী"
            | "ফ্যান্টাসি"
            | "প্রযুক্তি",
          coverImageUrl: book.coverImage,
          price: book.price,
          stock: book.stock,
        }}
      />
    </div>
  );
};

export default EditBookPage;
