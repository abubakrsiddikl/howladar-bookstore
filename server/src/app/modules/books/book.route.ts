import { validateRequest } from "./../../middlewares/validateRequest";
import express from "express";
import { BookController } from "./book.controller";
import { createBookZodSchema } from "./book.validation";
import { authenticate, authorize } from "../auth/auth.middleware";

const router = express.Router();
// create a book
router.post(
  "/",
  validateRequest(createBookZodSchema),
  authenticate,
  authorize("admin", "store-manager"),
  BookController.createBook
);

// get all books
router.get("/", BookController.getAllBooks);

// get book stats
router.get(
  "/stats",
  authenticate,
  authorize("admin"),
  BookController.getBookStats
);

// get single book
router.get("/:bookId", BookController.getSingleBook);

// update book
router.put(
  "/:bookId",
  authenticate,
  authorize("admin", "store-manager"),
  BookController.updateBook
);

// delete book
router.delete(
  "/:bookId",
  authenticate,
  authorize("admin", "store-manager"),
  BookController.deleteBook
);

export const BookRoutes = router;
