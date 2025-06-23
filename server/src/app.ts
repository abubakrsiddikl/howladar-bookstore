import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { BookRoutes } from "./app/modules/books/book.route";
import { AuthRoutes } from "./app/modules/auth/auth.route";

const app: Application = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/books", BookRoutes);
app.use("/api/v1/auth", AuthRoutes);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "📚  howladar bookstore server server is running!" });
});

export default app;
