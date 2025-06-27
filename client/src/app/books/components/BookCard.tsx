"use client";

import { useCartContext } from "@/hooks/useCartContext";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

import { FaPlus } from "react-icons/fa";
type BookCardProps = {
  _id: string;
  title: string;
  author: string;
  price: number;
  coverImage: string;
  stock: number;
};

const BookCard = ({
  _id,
  title,
  author,
  price,
  coverImage,
  stock,
}: BookCardProps) => {
  const { addToCart } = useCartContext();
  const handleAddToCart = () => {
    const cartItem = {
      book: { _id, title, coverImage, price },
      quantity: 1,
    };
    addToCart(cartItem);
    toast.success("Item added to cart!");
  };
  return (
    <div className="bg-white shadow-md hover:shadow-2xl transition-shadow duration-300 rounded-lg">
      <Link href={`/bookdetails/${_id}`}>
        <div className="relative w-full h-64">
          <Image src={coverImage} alt={title} fill className="object-contain" />
        </div>
        {/* card info */}
        <div className="py-2 pl-7">
          <h3 className="text-sm font-semibold line-clamp-2">{title}</h3>
          <p className="text-gray-500 text-sm ">by {author}</p>
          <p className="text-[#FF8600] font-semibold text-2xl ">৳ {price}</p>
          <p
            className={`text-sm ${
              stock > 0 ? "text-green-600" : "text-red-500"
            }`}
          >
            {stock > 0 ? "In Stock" : "Out of Stock"}
          </p>
        </div>
      </Link>

      <div className="px-4 pb-4">
        <button
          className={`w-full px-4 py-2 rounded-lg text-lg cursor-pointer ${
            stock > 0
              ? "bg-[#FF8600] text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={stock === 0}
        >
          {stock > 0 ? (
            <button
              onClick={handleAddToCart}
              className="flex justify-center items-center gap-2"
            >
              Add to Cart<FaPlus></FaPlus>
            </button>
          ) : (
            "Out of Stock"
          )}
        </button>
      </div>
    </div>
  );
};

export default BookCard;
