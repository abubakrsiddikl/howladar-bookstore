import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";
import config from "./config";

let server: Server;
const PORT = parseInt(config.port || "3000",10);

async function main() {
  try {
    await mongoose.connect(config.db_uri!);
    console.log("✅ Database connected");
    server = app.listen(PORT,"0.0.0.0", () => {
      console.log(`✅ Server running on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
