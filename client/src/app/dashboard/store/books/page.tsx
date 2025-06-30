"use client";

import Link from "next/link";

import Image from "next/image";
import { useBooks } from "@/hooks/useBooks";
import { axiosSecure } from "@/lib/axios";
import Swal from "sweetalert2";

export default function BookListPage() {
  const { books } = useBooks("");

  const handleDelete = async (id: string, bookTitle: string) => {
    Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: `আপনি এই ${bookTitle} বইটি  মুছে ফেলতে চান `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "বাতিল",
      confirmButtonText: "হ্যাঁ, মুছে ফেলুন !",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/books/${id}`
        );
        Swal.fire({
          title: "মুছে ফেলা হয়েছে!",
          text: "বইটি  মুছে ফেলা সম্পন্ন  হয়েছে",
          icon: "success",
        });
      }
    });
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-3xl font-bold">Book List</h1>
        <Link
          href="/dashboard/store/books/add"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add New Book
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Author</th>
              <th className="p-2 border">Genre</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Stock</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td className="p-2 border">
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    width={64}
                    height={64}
                    className="w-16 h-16 object-cover"
                  />
                </td>
                <td className="p-2 border">{book.title}</td>
                <td className="p-2 border">{book.author}</td>
                <td className="p-2 border">{book.genre}</td>
                <td className="p-2 border">৳ {book.price}</td>
                <td className="p-2 border">{book.stock}</td>
                <td className="p-2 border space-x-2">
                  <Link
                    href={`./books/edit/${book._id}`}
                    className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(book._id, book.title)}
                    className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
