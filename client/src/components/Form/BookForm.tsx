"use client";

import { useImageUpload } from "@/hooks/useImageUpload";
import { axiosSecure } from "@/lib/axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

//  Genres
const genres = [
  "উপন্যাস",
  "গল্প",
  "ইসলামিক",
  "বিজ্ঞান",
  "ইতিহাস",
  "জীবনী",
  "ফ্যান্টাসি",
  "প্রযুক্তি",
] as const;

// Zod Schema
const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  genre: z.enum(genres, { errorMap: () => ({ message: "Select a genre" }) }),
  coverImage: z.any().refine((file) => file?.length === 1, {
    message: "Cover image is required",
  }),
  price: z
    .number({ invalid_type_error: "Price is required" })
    .min(1, "Price must be greater than 0"),
  stock: z
    .number({ invalid_type_error: "Stock is required" })
    .min(0, "Stock cannot be negative"),
});

// type
export type BookFormData = z.infer<typeof bookSchema>;

interface BookFormProps {
  id?: string;
  defaultValues?: Partial<BookFormData & { coverImageUrl?: string }>;
}

const BookForm = ({ id, defaultValues }: BookFormProps) => {
  const router = useRouter();
  const { uploadImage } = useImageUpload();
  const [previewImage, setPreviewImage] = useState(
    defaultValues?.coverImageUrl || ""
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      ...defaultValues,
      title: defaultValues?.title || "",
      author: defaultValues?.author || "",
      genre: (defaultValues?.genre as (typeof genres)[number]) || undefined,
      price: defaultValues?.price || 0,
      stock: defaultValues?.stock || 0,
    },
  });

  //  Submit Handler
  const onSubmit = async (data: BookFormData) => {
    console.log(typeof data.price);
    try {
      const imageFile = data.coverImage[0];
      const imageUrl = await uploadImage(imageFile);

      const payload = {
        title: data.title,
        author: data.author,
        genre: data.genre,
        coverImage: imageUrl,
        price: data.price,
        stock: data.stock,
      };

      if (id) {
        await axiosSecure.put(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/books/${id}`,
          payload
        );
        toast.success("Book update successfull");
      } else {
        await axiosSecure.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/books`,
          payload
        );
        toast.success("Book Post Successfull");
      }

      reset();
      router.push("/dashboard/store/books");
    } catch (error) {
      console.error("Failed to submit book", error);
    }
  };

  // Image Preview Handler
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-semibold mb-4">
        {id ? "Update Book" : "Add New Book"}
      </h2>

      {/* Title */}
      <div>
        <label className="block mb-1 font-medium">Title</label>
        <input
          type="text"
          {...register("title")}
          className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter book title"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      {/* Author */}
      <div>
        <label className="block mb-1 font-medium">Author</label>
        <input
          type="text"
          {...register("author")}
          className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter author name"
        />
        {errors.author && (
          <p className="text-red-500 text-sm">{errors.author.message}</p>
        )}
      </div>

      {/* Genre Dropdown */}
      <div>
        <label className="block mb-1 font-medium">Genre</label>
        <select
          {...register("genre")}
          className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a genre</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        {errors.genre && (
          <p className="text-red-500 text-sm">{errors.genre.message}</p>
        )}
      </div>

      {/* Cover Image */}
      <div>
        <label className="block mb-1 font-medium">Cover Image</label>
        <input
          type="file"
          accept="image/*"
          {...register("coverImage")}
          onChange={handleImageChange}
          className="w-full border px-3 py-2 rounded-md"
        />
        {previewImage && (
          <Image
            src={previewImage}
            alt="Preview"
            width={96}
            height={96}
            className="mt-2 object-cover rounded-md border"
          />
        )}
        {/* {errors.coverImage && (
          <p className="text-red-500 text-sm">{errors.coverImage.message}</p>
        )} */}
      </div>

      {/* Price */}
      <div>
        <label className="block mb-1 font-medium">Price (৳)</label>
        <input
          type="number"
          {...register("price", { valueAsNumber: true })}
          className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter price"
        />
        {errors.price && (
          <p className="text-red-500 text-sm">{errors.price.message}</p>
        )}
      </div>

      {/* Stock */}
      <div>
        <label className="block mb-1 font-medium">Stock</label>
        <input
          type="number"
          {...register("stock", { valueAsNumber: true })}
          className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter stock quantity"
        />
        {errors.stock && (
          <p className="text-red-500 text-sm">{errors.stock.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
      >
        {isSubmitting ? "Submitting..." : id ? "Update Book" : "Add Book"}
      </button>
    </form>
  );
};

export default BookForm;
