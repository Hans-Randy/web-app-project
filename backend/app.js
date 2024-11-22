import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import products from "./routes/products.js";
import multer from "multer";
import cors from "cors";

// For authentication handling 
// import authRoute from "./routes/authRoute"
import { requireAuth } from "./utils/utils.js";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoute.js";
// import testlogin from "./routes/testlogin.js";
import testlogin from "./routes/testlogin.js";


const app = express();
const port = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser()); // For authentication


// Connect to MongoDB Atlas, if successful, start server
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() =>
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    })
  )
  .catch((err) => console.log(`DB Connection Error: ${err}`));

// Enable CORS for React front-end (running on port 3000)
// app.use(cors({
//   origin: 'http://localhost:3000',  // URL of your React app
//   methods: ['GET', 'POST'],
//   credentials: true,  // Allow cookies or authorization headers
// }));


// Routes
app.use("/api/products", products);

// For authentication 
app.use("/testlogin", requireAuth, testlogin); //Only used during the testing of authentication module
console.log("Started for testlogin and /api/auth");
// app.use("/", testlogin); //Only used during the testing of authentication module
app.use("/api/auth/", authRoute)


