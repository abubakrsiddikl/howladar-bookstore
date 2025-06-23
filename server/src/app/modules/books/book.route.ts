import { validateRequest } from "./../../middlewares/validateRequest";
import express from "express";
import { BookController } from "./book.controller";
import { createBookZodSchema } from "./book.validation";
import { authenticate, authorize } from "../auth/auth.middleware";

const router = express.Router();
// create a book
router.post(
  "/",
  validateRequest(createBookZodSchema),authenticate,authorize("admin"),
  BookController.createBook
);

// get all books
router.get("/", BookController.getAllBooks);

// get single book
router.get("/:bookId", BookController.getSingleBook);

// update book
router.put("/:bookId", BookController.updateBook);

// delete book
router.delete("/:bookId", BookController.deleteBook);

export const BookRoutes = router;
