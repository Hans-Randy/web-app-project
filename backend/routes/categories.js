import { getDistinctCategories } from "../controllers/categoryController.js";
import express from "express";

const router = express.Router();

// GET distinct categories
router.get("/", (req, res) => {
  return getDistinctCategories(req, res);
});

export default router;
