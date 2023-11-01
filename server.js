import app from "./app.js";
import mongoose from "mongoose";
import "dotenv/config";

const uriDb = process.env.uriDb;

try {
  await mongoose.connect(uriDb, { dbName: "db-contacts" });
  console.log("Database connection successful");

  app.listen(3000, () => {
    console.log("Server running. Use our API on port: 3000");
  });
} catch (error) {
  console.error("Cannot connect to Mongo Database");
  console.error(error);
  process.exit(1);
}
