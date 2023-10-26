import app from "./app.js";
import mongoose from "mongoose";
import "dotenv/config";

const uriDb = process.env.uriDb;

/* const connection = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); */

/* connection
  .then(() => {
    app.listen(PORT, function () {
      console.log("Database connection successful");
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) =>
    console.log(`Server not running. Error message: ${err.message}`)
  ); */

try {
  const connection = await mongoose.connect(uriDb, { dbName: "db-contacts" });
  console.log("Database connection successful");

  app.listen(3000, () => {
    console.log("Server running. Use our API on port: 3000");
  });
} catch (error) {
  console.error("Cannot connect to Mongo Database");
  console.error(error);
  process.exit(1);
}
