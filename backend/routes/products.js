import express from "express";
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
router.post("/", createProduct);

// PUT update an existing product
router.put("/:id", updateProduct);

// PATCH partially update a product
router.patch("/:id", patchProduct);

// DELETE remove a product
router.delete("/:id", deleteProduct);

// DELETE remove all products
router.delete("/", deleteAllProducts);

export default router;
