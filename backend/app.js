import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import products from "./routes/products.js";
import { connectToDB } from "./utils/database.js";
import users from "./routes/users.js";
import { requireAuth } from "./utils/utils.js";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoute.js";
dotenv.config();

// Middleware
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

// Connect to MongoDB Atlas
connectToDB(process.env.MONGODB_CONNECTION_STRING, process.env.BUCKET_NAME);

// List of allowed origins
const allowedOrigins = [
  "https://e-commerce-group-1.netlify.app",
  "http://localhost:3000", // Include your local development URL
];

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true, // Allow credentials (cookies, authorization headers)
};

// Use CORS middleware
app.use(cors(corsOptions));

// Routes
app.use("/api/auth/", authRoute);
//app.use("/api/users", requireAuth, users);
app.use("/api/users", users);
app.use("/api/products", requireAuth, products);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
