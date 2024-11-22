import express from "express";
import multer from "multer";
import storage from "../utils/storage.js";

import {
  getAllProducts,
  getProductById,
  getProductsByName,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteAllProducts,
  patchProduct,
} from "../controllers/productController.js";

const router = express.Router();

const upload = multer({ storage });

const uploadMiddleware = upload.single("image");

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
router.post("/", uploadMiddleware, createProduct);

// PUT update an existing product
router.put("/:id", updateProduct);

// PATCH partially update a product
router.patch("/:id", patchProduct);

// DELETE remove a product
router.delete("/:id", deleteProduct);

// DELETE remove all products
router.delete("/", deleteAllProducts);

export default router;
