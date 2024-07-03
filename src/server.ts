import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";
import { Server } from "http";

// server tis here
let server: Server;

async function main() {
  try {
    await mongoose.connect(config.bd_url as string);
    console.log("Connected to MongoDB");

    server = app.listen(config.port, () => {
      console.log(`This server is running on port ${config.port}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

main();

// unHandle rejection error handle
process.on("unhandledRejection", () => {
  console.log("unhandledRejection is detected! Server is closed now! .... 😈");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// uncaught exception error handler
process.on("uncaughtException", () => {
  console.log("uncaughtException is detected! Server is closed now! .... 😈");
  process.exit(1);
});
