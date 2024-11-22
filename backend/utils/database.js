// Importing required modules
import mongoose from "mongoose";
import Grid from "gridfs-stream"; // For working with GridFS, a MongoDB specification for storing large files

// Function to connect to MongoDB and configure GridFS
const connectToDB = (connectionString, bucketName) => {
  // Connect to MongoDB using Mongoose with options to handle deprecation warnings
  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Reference to the Mongoose connection instance
  const connection = mongoose.connection;

  // Event listener for the "open" event, triggered when the connection is successfully established
  connection.once("open", () => {
    console.log("MongoDB connection established!");

    // Initialize GridFS-Stream to interact with GridFS
    const gfs = Grid(connection.db, mongoose.mongo); // Use the raw MongoDB connection from Mongoose
    gfs.collection(bucketName); // Set the bucket name for storing files
  });

  // Event listener for the "error" event, triggered when an error occurs in the connection
  connection.on("error", (err) => {
    console.error(`Connection error: ${err}`); // Log the error message
  });
};

export default connectToDB;
