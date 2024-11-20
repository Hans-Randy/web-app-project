import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import products from "./routes/products.js";
import multer from multer;
import cors from cors;

const app = express();
const port = process.env.PORT;

// Middleware
app.use(cors);
app.use(express.json());

// Connect to MongoDB Atlas, if successful, start server
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() =>
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    })
  )
  .catch((err) => console.log(`DB Connection Error: ${err}`));

// Routes
app.use("/api/products", products);