import express, { Application, Request, Response } from "express";
import cors from "cors";
import { BookRoutes } from "./app/modules/books/book.route";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/books", BookRoutes);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "📚  howladar bookstore server server is running!" });
});

export default app;
