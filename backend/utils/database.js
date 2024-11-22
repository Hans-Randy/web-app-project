import mongoose from "mongoose";
import Grid from "gridfs-stream";

let gfs; // Exportable variable for GridFS

const connectToDB = (connectionString, bucketName) => {
  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const connection = mongoose.connection;

  connection.once("open", () => {
    console.log("MongoDB connection established!");

    // Initialize GridFS-Stream
    gfs = Grid(connection.db, mongoose.mongo);
    gfs.collection(bucketName); // Set the bucket name
  });

  connection.on("error", (err) => {
    console.error(`Connection error: ${err}`);
  });
};

// Export both the connect function and the gfs instance
export { connectToDB, gfs };
