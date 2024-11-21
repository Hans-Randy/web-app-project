import express from "express";
import mongoose from "mongoose";
import products from "./routes/products.js";
import cors from "cors";

const app = express();
const port = process.env.PORT;

// Middleware
app.use(cors);
app.use(express.json());
app.use(bodyParser.json());

// MongoDB Connection for GridFS
const connectionString = process.env.MONGODB_CONNECTION_STRING;
const connection = mongoose.createConnection(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Initialize GridFS Stream
let gfs;
connection.once("open", () => {
  gfs = Grid(connection.db, mongoose.mongo);
  gfs.collection("productImages"); // Bucket name
});

// Routes
app.use("/api/products", products);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
