import BookForm from "@/components/Form/BookForm";

export default function AddBookPage() {
  return (
    <div className="px-4 py-6">
      <h1 className="text-3xl font-bold mb-4">Add New Book</h1>
      <BookForm />
    </div>
  );
}
