"use client";

import { useCartContext } from "@/hooks/useCartContext";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

import { IoCartOutline } from "react-icons/io5";
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
  const isOutOfStock = stock === 0;
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
      <div className="relative w-full h-64">
        <Image
          src={coverImage}
          alt={title}
          fill
          className="pt-1 px-1 md:px-2 md:pt-2"
        />
      </div>
      {/* card info */}
      <div className="py-2 pl-7">
        {/* title */}
        <Link href={`/bookdetails/${_id}`}>
          <h3 className="text-sm font-semibold hover:text-[#FF8600] line-clamp-1">{title}</h3>
        </Link>

        <p className="text-gray-500 text-sm line-clamp-1">by {author}</p>
        <p className="text-[#FF8600] font-semibold text-2xl ">৳ {price}</p>
        <p
          className={`text-sm ${stock > 0 ? "text-green-600" : "text-red-500"}`}
        >
          {stock > 0 ? "Product in stock" : "Out of Stock"}
        </p>
      </div>

      <div className="px-2 pb-4">
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`w-full p-1 md:px-4 md:py-1 rounded-lg text-lg flex justify-center items-center gap-2 transition ${
            isOutOfStock
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-[#FF8600] text-white hover:bg-[#e67600] cursor-pointer"
          }`}
        >
          {isOutOfStock ? (
            "Out of Stock"
          ) : (
            <>
              <IoCartOutline></IoCartOutline> Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default BookCard;
