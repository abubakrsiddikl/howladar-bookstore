import { Schema, model } from "mongoose";
import { IBook } from "./book.interface";

const BookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: [true, "Book title is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    stock: {
      type: Number,
      required: [true, "Stock is required"],
      min: [0, "Stock cannot be negative"],
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
      enum: [
        "উপন্যাস",
        "গল্প",
        "ইসলামিক",
        "বিজ্ঞান",
        "ইতিহাস",
        "জীবনী",
        "ফ্যান্টাসি",
        "প্রযুক্তি",
      ],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    coverImage: {
      type: String,
      required: [true, "Cover image is required"],
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Book = model<IBook>("Book", BookSchema);
