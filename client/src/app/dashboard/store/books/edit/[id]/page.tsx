import BookForm from "@/components/Form/BookForm";
import { axiosSecure } from "@/lib/axios";
import { notFound } from "next/navigation";

// ✅ Fetch Book Details
const getBook = async (id: string) => {
  try {
    const res = await axiosSecure.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/books/${id}`
    );
    return res.data.data;
  } catch {
    return null;
  }
};

// ✅ Edit Page Component
const EditBookPage = async ({ params }: { params: { id: string } }) => {
  const book = await getBook(params.id);

  if (!book) {
    notFound();
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold mb-6">Edit Book</h1>
      <BookForm
        id={params.id}
        defaultValues={{
          title: book.title,
          author: book.author,
          genre: book.genre,
          coverImageUrl: book.coverImage,
          price: book.price,
          stock: book.stock,
        }}
      />
    </div>
  );
};

export default EditBookPage;
