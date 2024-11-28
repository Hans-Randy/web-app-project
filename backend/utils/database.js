import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";

let bucket;
const connectToDB = (connectionString, bucketName) => {
  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const connection = mongoose.connection;

  connection.once("open", () => {
    // Initialize GridFSBucket
    bucket = new GridFSBucket(connection.db, { bucketName: bucketName });
    console.log("MongoDB connection established!");
  });

  connection.on("error", (err) => {
    console.error(`Connection error: ${err}`);
  });
};

export { connectToDB, bucket };
