import Product from "../models/Product.js";
import validateProduct from "../validation/productValidation.js";

// GET all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET a single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET all products containing a particular substring in name
export const getProductsByName = async (req, res) => {
  const { name } = req.query; // Extract the 'name' query string parameter

  try {
    // Check if the name query parameter exists
    if (!name) {
      return res
        .status(400)
        .json({ message: "Name query parameter is required" });
    }

    // Find products where the name contains the substring
    const products = await Product.find({
      name: { $regex: name, $options: "i" }, // Case-insensitive search in 'name'
    });

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST create a new product
export const createProduct = async (req, res) => {
  // Validate data
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { name, description, price, quantity, category } = req.body;
  const product = new Product({ name, description, price, quantity, category });

  try {
    const savedProduct = await product.save();
    res.json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT update an existing product
export const updateProduct = async (req, res) => {
  // Validate data
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { id } = req.params;
  const { name, description, price, quantity, category } = req.body;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }

    product.name = name;
    product.description = description;
    product.price = price;
    product.quantity = quantity;
    product.category = category;

    const updatedproduct = await product.save();
    res.json(updatedproduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PATCH partially update a product
export const patchProduct = async (req, res) => {
  // Validate data
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { id } = req.params;
  const updates = req.body;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }

    Object.assign(product, updates);

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE remove a product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }

    await product.deleteOne();
    res.json({ message: "product removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE all products
export const deleteAllProducts = async (req, res) => {
  try {
    const result = await Product.deleteMany({}); // Delete all documents in the 'products' collection
    res.json({
      message: "All products removed",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
