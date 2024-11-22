// Importing required modules
import crypto from "crypto"; // For generating random bytes to create unique file names
import path from "path"; // For working with file paths and extensions
import GridFsStorage from "multer-gridfs-storage"; // For storing files in MongoDB using GridFS
import dotenv from "dotenv";

// Load environment variables from the .env file into process.env
dotenv.config();

// Create a GridFS storage instance
const storage = new GridFsStorage({
  // MongoDB connection string from environment variables
  url: process.env.MONGODB_CONNECTION_STRING,

  // Function to customize file storage
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      // Generate 16 random bytes to create a unique file name
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          // Reject the promise if an error occurs
          return reject(err);
        }
        // Create a unique filename by converting random bytes to a hex string
        // and appending the original file's extension
        const filename = buf.toString("hex") + path.extname(file.originalname);

        // Specify file metadata, including the filename and bucket name
        const fileInfo = {
          filename: filename,
          bucketName: process.env.BUCKET_NAME, // Bucket name for grouping files in GridFS
        };

        // Resolve the promise with the file information
        resolve(fileInfo);
      });
    });
  },
});

// Export the storage configuration for use in other parts of the application
export default storage;
