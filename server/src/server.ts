import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";

let server: Server;

async function main() {
  try {
    await mongoose.connect("mongodb://localhost:27017/howladar-bookstore");
    console.log("✅ Database connected");
    server = app.listen(5000, () => {
      console.log(`✅ Server running on port ${5000}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
