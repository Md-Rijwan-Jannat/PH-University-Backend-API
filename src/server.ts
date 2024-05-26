import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

async function main() {
  try {
    await mongoose.connect(config.bd_url as string, {
      w: "majority", // Correct write concern
      wtimeoutMS: 5000, // Optional: timeout for write concern
    });
    console.log("Connected to MongoDB");

    app.listen(config.port, () => {
      console.log(`This server is running on port ${config.port}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

main();
