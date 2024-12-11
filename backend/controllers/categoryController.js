import Product from "../models/Product.js";
// Controller to get distinct categories
export const getDistinctCategories = async (req, res) => {
  try {
    // Use MongoDB's distinct method to get unique categories
    const categories = await Product.distinct("category");

    // Send the response with the list of distinct categories
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching distinct categories:", error);
    res.status(500).json({ message: "Server error" });
  }
};
