import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { BookRoutes } from "./app/modules/books/book.route";
import { AuthRoutes } from "./app/modules/auth/auth.route";
import { UserRoutes } from "./app/modules/users/user.route";
import { OrderRoutes } from "./app/modules/orders/order.route";
import config from "./config";
import { CartRoutes } from "./app/modules/Cart/cart.route";

const app: Application = express();

app.use(
  cors({
    origin: [config.client_url, "http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/books", BookRoutes);
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/users", UserRoutes);
app.use("/api/v1/order", OrderRoutes);
app.use("/api/v1/cart", CartRoutes);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "📚  howladar bookstore server server is running!" });
});

export default app;
