import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import products from "./routes/products.js";
import { connectToDB } from "./utils/database.js";

dotenv.config();

// Middleware
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Connect to MongoDB Atlas
connectToDB(process.env.MONGODB_CONNECTION_STRING, process.env.BUCKET_NAME);

// Routes
app.use("/api/products", products);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
