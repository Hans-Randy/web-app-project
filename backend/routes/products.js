import express from "express";
import multer from "multer";
import { bucket } from "../utils/database.js";
import crypto from "crypto";
import path from "path";

import {
  getAllProducts,
  getProductById,
  getProductsByName,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteProducts,
  patchProduct,
} from "../controllers/productController.js";

const router = express.Router();

// Multer storage configuration
const storage = multer.memoryStorage(); // Temporarily store file in memory
const upload = multer({ storage });
const uploadSingleFile = upload.single("file");

// Middleware for uploading files to GridFSBucket
const uploadFileToGridFS = async (req, res, next) => {
  if (!bucket) {
    return res.status(500).send("GridFSBucket not initialized");
  }

  const file = req.file;

  try {
    const uniqueFileName = await new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) return reject(err);
        resolve(buf.toString("hex") + path.extname(file.originalname));
      });
    });

    const uploadStream = bucket.openUploadStream(uniqueFileName, {
      metadata: {
        originalName: file.originalname,
        mimeType: file.mimetype,
      },
    });

    uploadStream.end(file.buffer); // Write file data to GridFS

    req.uploadedFile = {
      id: uploadStream.id,
      filename: uniqueFileName,
    };
    next();
  } catch (err) {
    res.status(500).send("Image upload failed: " + err.message);
  }
};

// GET all products or search products by name
router.get("/", (req, res) => {
  if (req.query.name) {
    return getProductsByName(req, res);
  }
  return getAllProducts(req, res);
});

// GET a single product by ID
router.get("/:id", getProductById);

// POST create a new product
router.post("/", uploadSingleFile, uploadFileToGridFS, createProduct);

// PUT update an existing product
router.put("/:id", updateProduct);

// PATCH partially update a product
router.patch("/:id", patchProduct);

// DELETE remove a product
router.delete("/:id", deleteProduct);

// DELETE remove products
router.delete("/", deleteProducts);

export default router;
