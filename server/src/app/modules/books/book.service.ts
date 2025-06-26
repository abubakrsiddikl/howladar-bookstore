import { IBook, IBookFilterOptions } from "./book.interface";
import { Book } from "./book.model";

export const BookService = {
  // create book
  createBook: async (payload: IBook) => {
    const newBook = await Book.create(payload);
    return newBook;
  },
  // get all book
  getAllBooks: async (options: IBookFilterOptions) => {
    const { search, genre, page = 1, limit = 10 } = options;
    let filters: any = {};
    if (search) {
      const regex = new RegExp(search, "i");
      filters = {
        $or: [
          { title: { $regex: regex } },
          { author: { $regex: regex } },
          { genre: { $regex: regex } },
        ],
      };
    }
    if (genre) {
      filters.genre = genre;
    }
    const skip = (page - 1) * limit;
    const books = await Book.find(filters)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    const total = await Book.countDocuments(filters);
    return {
      meta: {
        page,
        limit,
        total,
      },
      books,
    };
  },
  // get single book
  getSingleBook: async (bookId: string) => {
    const book = await Book.findById(bookId);
    if (!book) {
      throw new Error("Book not found");
    }
    return book;
  },
  // update a book info
  updateBook: async (bookId: string, payload: Partial<IBook>) => {
    const updatedBook = await Book.findByIdAndUpdate(bookId, payload, {
      new: true,
    });
    return updatedBook;
  },
  // delete a book
  deleteBook: async (bookId: string) => {
    const result = await Book.findByIdAndDelete(bookId);
    return result;
  },
};
