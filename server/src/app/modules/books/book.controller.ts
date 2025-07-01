import { Request, Response } from "express";
import { BookService } from "./book.service";

export const BookController = {
  // ! create a book
  createBook: async (req: Request, res: Response) => {
    try {
      const result = await BookService.createBook(req.body);
      res.json({
        success: true,
        message: "Book created Successfull",
        data: result,
      });
    } catch (error) {
      res.json(error);
    }
  },

  // ! get all books
  getAllBooks: async (req: Request, res: Response) => {
    const { search, genre } = req.query;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const options = {
      search: search as string,
      genre: genre as string,
      page,
      limit,
    };
    const result = await BookService.getAllBooks(options);
    res.json({
      success: true,
      message: "Book retrived Successfull",
      data: result,
    });
  },

  // ! get book stats
  getBookStats: async (req: Request, res: Response) => {
    try {
      const stats = await BookService.getBookStats();

      res.status(200).json({
        success: true,
        message: "Book stats fetched successfully",
        data: stats,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch book stats",
        error,
      });
    }
  },
  // ! get single book
  getSingleBook: async (req: Request, res: Response) => {
    const id = req.params.bookId;
    const result = await BookService.getSingleBook(id);
    res.json({
      success: true,
      message: "Book retrived Successfull",
      data: result,
    });
  },

  // !update a book
  updateBook: async (req: Request, res: Response) => {
    const id = req.params.bookId;
    const updatedDoc = req.body;
    const result = await BookService.updateBook(id, updatedDoc);
    res.json({
      success: true,
      message: "Book update succesfull",
      data: result,
    });
  },

  // ! delete a book
  deleteBook: async (req: Request, res: Response) => {
    const id = req.params.bookId;
    const result = await BookService.deleteBook(id);
    res.json({
      success: true,
      message: "Book deleted succesfull",
      data: null,
    });
  },
};
